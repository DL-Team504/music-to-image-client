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
import useYoutubeDownload from "@/hooks/useYoutubeDownload";
import audioToImage from "@/../public/audio_to_image.svg";

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
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [showYoutubeInput, setShowYoutubeInput] = useState<boolean>(false);

  const {
    uploadAudio,
    isLoading,
    isSuccess,
    generatedImageUrl: mp3GeneratedImageUrl,
  } = useUploadAudio();
  const {
    downloadFromYoutube,
    isLoading: isDownloading,
    isSuccess: isYoutubeSuccess,
    generatedImageUrl: youtubeGeneratedImageUrl,
  } = useYoutubeDownload();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "audio/mpeg": [".mp3"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        console.log("No files accepted");
        return;
      }
      handleFileUpload(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    if (file !== null) {
      setFocusArea([0, Math.min(file.duration, 60)]);
    } else {
      setFocusArea([0, 1]);
    }
  }, [file]);

  const handleFileUpload = (selectedFile: File) => {
    const preview = URL.createObjectURL(selectedFile);
    const audio = document.createElement("audio");

    audio.src = preview;
    audio.addEventListener("loadedmetadata", () => {
      setFile(Object.assign(selectedFile, { duration: audio.duration }));
      URL.revokeObjectURL(preview);
    });

    audio.addEventListener("error", () => {
      console.error("Error loading audio file");
      URL.revokeObjectURL(preview);
    });
  };

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

  const handleGenerate = () => {
    if (file === null) return;
    uploadAudio({ audio: file, focusArea, imageStyle });
  };

  const handleYoutubeGenerate = () => {
    if (!youtubeUrl) return;
    downloadFromYoutube(youtubeUrl, imageStyle);
  };

  const handleDownload = async () => {
    const imageUrl = mp3GeneratedImageUrl || youtubeGeneratedImageUrl;
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      saveAs(blob, "generated-image.jpg");
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const handleAddToGallery = () => {
    // Simulate adding to gallery (actual backend integration needed)
    alert("Image added to gallery!");
    navigate("/gallery");
  };

  const handleNewSong = () => {
    setFile(null);
    setFocusArea([0, 1]);
    setImageStyle("");
    setYoutubeUrl("");
    setShowYoutubeInput(false);
  };

  return (
    <>
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
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          Upload Your Song
        </Typography>

        {!showYoutubeInput && (
          <Box
            height="100%"
            width="100%"
            maxWidth={360}
            {...getRootProps()}
            sx={{
              border: "1px dashed",
              padding: 2,
              textAlign: "center",
              mx: "auto",
              mt: 2,
            }}
          >
            <input {...getInputProps()} />
            <Button
              component="span"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              disabled={!!file || isDownloading}
            >
              {file ? file.name : "Drag and drop audio here"}
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          sx={{ mt: 2, width: "100%" }}
        >
          {showYoutubeInput
            ? "Back to MP3 Upload"
            : "Generate Song from YouTube"}
        </Button>

        {showYoutubeInput && (
          <Box>
            <TextField
              label="YouTube URL"
              fullWidth
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              sx={{ mt: 2 }}
              disabled={isDownloading || !!file}
            />
            <TextField
              label="Image Style Description"
              multiline
              rows={4}
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleYoutubeGenerate}
              sx={{ mt: 2, width: "100%" }}
              disabled={!youtubeUrl || isDownloading}
            >
              {isDownloading ? "Generating..." : "Generate from YouTube"}
            </Button>
          </Box>
        )}

        {file && !showYoutubeInput && (
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

            {isLoading ? (
              <LinearProgress sx={{ width: "100%", mt: 2 }} />
            ) : (
              <LoadingButton
                size="large"
                variant="contained"
                onClick={handleGenerate}
                sx={{ width: "100%", mt: 2 }}
                disabled={!file}
              >
                Generate
              </LoadingButton>
            )}
          </Stack>
        )}

        {(isSuccess || isYoutubeSuccess) &&
          (mp3GeneratedImageUrl || youtubeGeneratedImageUrl) && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Card sx={{ width: 256, margin: "0 auto" }}>
                <CardMedia
                  component="img"
                  image={mp3GeneratedImageUrl || youtubeGeneratedImageUrl}
                  height={256}
                  loading="lazy"
                />
              </Card>
              <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleDownload}>
                  Download
                </Button>
                <Button variant="contained" onClick={handleAddToGallery}>
                  Add to Gallery
                </Button>
                <Button variant="contained" onClick={handleNewSong}>
                  New Song
                </Button>
              </Stack>
            </Box>
          )}
      </Box>

      {!file && !showYoutubeInput && (
        <Box sx={{ mt: 8, mb: 8, textAlign: "center" }}>
          <img
            src={audioToImage}
            alt="Lunar: Visual representation of audio processing"
            style={{ width: "550px", height: "auto" }}
          />
        </Box>
      )}
    </>
  );
}
