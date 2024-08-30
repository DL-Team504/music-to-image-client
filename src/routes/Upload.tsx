import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Slider, Stack, Card, CardMedia, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import useUploadAudio from "@/Components/CreationDialog/useUploadAudio";

interface AudioFile extends File {
  duration: number;
}

const MIN_DURATION = 10;
const MAX_DURATION = 60;

export default function Upload() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [file, setFile] = useState<AudioFile | null>(null);
  const [focusArea, setFocusArea] = useState<[number, number]>([0, 1]);
  const [imageStyle, setImageStyle] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<
    string | undefined
  >(undefined);
  //TODO
  const [isLoading, setIsLoading] = useState(false);

  const { uploadAudio, reset, status, progress } = useUploadAudio();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "audio/mpeg": [".mp3"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        alert("Unsupported file type. Please upload an MP3 file.");
        return;
      }

      if (acceptedFiles.length === 0) {
        console.log("No files accepted");
        return;
      }

      const selectedFile = acceptedFiles[0];
      const preview = URL.createObjectURL(selectedFile);
      const audio = document.createElement("audio");

      audio.src = preview;
      audio.addEventListener("loadedmetadata", () => {
        console.log("Audio metadata loaded");
        setFile(Object.assign(selectedFile, { duration: audio.duration }));
        URL.revokeObjectURL(preview);
      });

      audio.addEventListener("error", () => {
        console.error("Error loading audio file");
        URL.revokeObjectURL(preview);
      });
    },
  });

  useEffect(() => {
    if (file !== null) {
      setFocusArea([0, Math.min(file.duration, 60)]);
    } else {
      setFocusArea([0, 1]);
    }
  }, [file]);

  function formatSecondsToTime(seconds: number) {
    if (file !== null && file.duration > 3600) {
      return new Date(seconds * 1000).toISOString().substring(11, 19);
    } else {
      return new Date(seconds * 1000).toISOString().substring(14, 19);
    }
  }

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (file === null) {
      return;
    }

    if (newValue[1] - newValue[0] < MIN_DURATION) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], file.duration - MIN_DURATION);
        setFocusArea([clamped, clamped + MIN_DURATION]);
      } else {
        const clamped = Math.max(newValue[1], MIN_DURATION);
        setFocusArea([clamped - MIN_DURATION, clamped]);
      }
    } else if (newValue[1] - newValue[0] > MAX_DURATION) {
      if (activeThumb === 0) {
        setFocusArea([
          newValue[0],
          Math.min(newValue[0] + MAX_DURATION, file.duration),
        ]);
      } else {
        setFocusArea([Math.max(newValue[1] - MAX_DURATION, 0), newValue[1]]);
      }
    } else {
      setFocusArea(newValue as [number, number]);
    }
  };

  //TODO
  const handleGenerate = () => {
    if (file === null) return;
    setIsLoading(true);
    setGeneratedImageUrl(undefined);
    // Simulate a network request or processing time with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedImageUrl(
        "https://images.unsplash.com/photo-1712464857903-57e1393d471d"
      );
      // Call uploadAudio to start the image generation process
      uploadAudio({ audio: file, focusArea, imageStyle });
    }, 2000);
  };

  function handleDownload() {
    if (file === null || generatedImageUrl === undefined) return;

    saveAs(generatedImageUrl, file.name);
  }

  function handleGoToGallery() {
    navigate("/gallery");
    reset();
    setFile(null);
    setImageStyle("");
    setGeneratedImageUrl(undefined);
  }
  // TODO
  // useEffect(() => {
  //   if (status === "success" && generatedImageUrl) {
  //     // Simulate setting a generated image URL after successful upload
  //     setGeneratedImageUrl(
  //       "https://images.unsplash.com/photo-1712464857903-57e1393d471d"
  //     );
  //   }
  // }, [status, generatedImageUrl]);

  return (
    <Box
      component="form"
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        maxWidth: 600,
        margin: "0 auto",
        mt: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, color: theme.palette.text.secondary }}
      >
        Upload Your Song
      </Typography>

      <Box
        height="100%"
        width="100%"
        maxWidth={360}
        {...getRootProps()}
        sx={{ border: "1px dashed", padding: 2, textAlign: "center" }}
      >
        <input {...getInputProps()} />
        <Button
          component="span"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          disabled={!!file}
        >
          {file ? file.name : "Drag and drop audio here"}
        </Button>
      </Box>

      {file && (
        <Stack spacing={2} mt={2}>
          <Typography>Area To Focus</Typography>
          <Slider
            min={0}
            step={1}
            max={file.duration}
            value={focusArea}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={formatSecondsToTime}
          />
          <TextField
            label="Image Style Description"
            multiline
            rows={4}
            value={imageStyle}
            onChange={(e) => setImageStyle(e.target.value)}
            sx={{ mt: 2 }}
          />

          {/* {status === "pending" ? */}
          {isLoading ? (
            <LinearProgress
              sx={{ width: "100%", mt: 2 }}
              // variant={progress !== 100 ? "determinate" : "indeterminate"}
              // value={progress}
            />
          ) : (
            <LoadingButton
              size="large"
              variant="contained"
              onClick={handleGenerate}
              sx={{ width: "100%", mt: 2 }}
              disabled={file === null}
            >
              Generate
            </LoadingButton>
          )}

          {/* status === "success" && */}
          {generatedImageUrl && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Card sx={{ width: 256, margin: "0 auto" }}>
                <CardMedia
                  component="img"
                  image={`${generatedImageUrl}?auto=format&fit=crop&w=286`}
                  height={256}
                  loading="lazy"
                />
              </Card>
              <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleDownload}>
                  Download
                </Button>
                <Button variant="contained" onClick={handleGoToGallery}>
                  Go to Gallery
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
}
