import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

import useUploadAudio from "./useUploadAudio";
import { Card, CardMedia, LinearProgress, TextField } from "@mui/material";

interface AudioFile extends File {
  duration: number;
}

export type CreationDialogProps = {
  open: NonNullable<DialogProps["open"]>;
  onClose: NonNullable<DialogProps["onClose"]>;
} & Omit<DialogProps, "children" | "open" | "onClose">;

const MIN_DURATION = 10;
const MAX_DURATION = 60;

export default function CreationDialog(props: CreationDialogProps) {
  const { onClose, ...rest } = props;

  const [file, setFile] = useState<AudioFile | null>(null);
  const [focusArea, setFocusArea] = useState<[number, number]>([0, 1]);
  const [imageStyle, setImageStyle] = useState<string>("");
  const {
    generatedImageUrl: _,
    uploadAudio,
    reset,
    status,
    progress,
  } = useUploadAudio();

  const [generatedImageUrl, setGeneratedImageUrl] = useState<
    string | undefined
  >(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    noClick: true,
    onDrop: (acceptedFiles) => {
      const preview = URL.createObjectURL(acceptedFiles[0]);
      const audio = document.createElement("audio");

      audio.src = preview;
      audio.addEventListener("loadedmetadata", () => {
        setFile(Object.assign(acceptedFiles[0], { duration: audio.duration }));
        URL.revokeObjectURL(preview);
      });
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (file !== null) {
      setFocusArea([0, Math.min(file.duration, 30)]);
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
    console.log(event);

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

  const _onClose: NonNullable<DialogProps["onClose"]> = (e, reason) => {
    setFile(null);
    setImageStyle("");
    onClose(e, reason);
    navigate;
    reset();
    setGeneratedImageUrl(undefined);
  };

  const handleGenerate = () => {
    if (file === null) return;
    setGeneratedImageUrl(
      "https://images.unsplash.com/photo-1712464857903-57e1393d471d"
    );
    uploadAudio({ audio: file, focusArea, imageStyle });
  };

  function handleDownload() {
    if (file === null || generatedImageUrl === undefined) return;

    saveAs(generatedImageUrl, file.name);
  }

  function handleGoToGallery() {
    _onClose({}, "backdropClick");
    navigate("/gallery");
  }

  return (
    <Dialog onClose={_onClose} {...rest}>
      <Stack direction="row">
        <img
          src="https://images.unsplash.com/photo-1711735346390-d6d2ee7f7d59?w=180&h=450&fit=crop"
          style={{ borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}
        />
        {generatedImageUrl === undefined ? (
          <Stack width="100%" paddingY={2} spacing={2} alignItems="center">
            <Typography variant="h3" textAlign="center">
              Start Creating Here
            </Typography>
            <Grid
              container
              height="100%"
              width="100%"
              justifyContent="center"
              paddingX={4}
              spacing={6}
            >
              <Grid xs={5}>
                <Box
                  height="100%"
                  width="100%"
                  maxWidth={360}
                  {...getRootProps()}
                >
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    endIcon={file === null && <CloudUploadIcon />}
                    sx={{
                      height: "100%",
                      width: "100%",
                      ...(file !== null && { textAlign: "center" }),
                    }}
                  >
                    <input {...getInputProps()} />
                    {file !== null
                      ? file.name.length > 16
                        ? file.name.slice(0, 16) +
                          "..." +
                          file.name.split(".").slice(-2, -1)[0].slice(-3) +
                          "." +
                          file.name.split(".").slice(-1)[0]
                        : file.name
                      : "Drag and drop audio here"}
                  </Button>
                </Box>
              </Grid>
              <Grid xs={7}>
                <Stack spacing={1}>
                  <Typography>Area To Focus</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Slider
                      min={0}
                      step={1}
                      max={file !== null ? file.duration : 1}
                      size="medium"
                      sx={{ marginLeft: 0 }}
                      value={focusArea}
                      valueLabelFormat={formatSecondsToTime}
                      valueLabelDisplay={file !== null ? "auto" : "off"}
                      disabled={file === null}
                      disableSwap
                      onChange={handleSliderChange}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {file !== null && formatSecondsToTime(0)}
                    </Typography>
                    <Typography>
                      {file !== null && formatSecondsToTime(file.duration)}
                    </Typography>
                  </Box>
                  <Typography>Image style description</Typography>
                  <TextField
                    multiline
                    maxRows={6}
                    inputProps={{ maxLength: 180 }}
                    disabled={file === null}
                    value={imageStyle}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setImageStyle(event.target.value);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
            {status !== "pending" ? (
              <LoadingButton
                size="large"
                sx={{ width: 300 }}
                variant="contained"
                disabled={file === null}
                onClick={handleGenerate}
              >
                Generate
              </LoadingButton>
            ) : (
              <>
                <LinearProgress
                  sx={{
                    width: "80%",
                    height: 10,
                    borderRadius: 5,
                    ...(status !== "pending" && { visibility: "hidden" }),
                  }}
                  variant={progress !== 100 ? "determinate" : "indeterminate"}
                  value={progress === null ? 0 : progress}
                />
                <Typography
                  variant="caption"
                  visibility={status !== "pending" ? "hidden" : undefined}
                >
                  {progress === null || progress !== 100
                    ? "uploading audio file to server"
                    : "generating image"}
                </Typography>
              </>
            )}
          </Stack>
        ) : (
          <Stack
            width={"100%"}
            paddingY={2}
            paddingX={4}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" textAlign="center">
              Generated Image
            </Typography>
            <Card sx={{ width: 256 }}>
              <CardMedia
                component="img"
                image={`${generatedImageUrl}?auto=format&fit=crop&w=286`}
                height={256}
                loading="lazy"
              />
            </Card>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Button variant="contained" onClick={handleDownload}>
                download
              </Button>
              <Button variant="contained" onClick={handleGoToGallery}>
                go to gallery
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
}
