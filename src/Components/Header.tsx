import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CreationDialog from "./CreationDialog";
import { useState } from "react";
import { useMatch, NavLink } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const [creationDialogOpen, setCreationDialogOpen] = useState(false);

  const isHome = useMatch("/");
  const isGallery = useMatch("/gallery");
  const isUpload = useMatch("/upload");

  const onStartNowClick = () => {
    setCreationDialogOpen(true);
  };

  const onCreationDialogClose = () => {
    setCreationDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        zIndex: 1000,
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Grid container alignItems="center">
        <Grid xs={3}>
          <Box justifyContent="center" alignItems="center" padding={2}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light} 80%);`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LunarBeats
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Stack spacing={6} direction="row" justifyContent="center">
            <Button
              variant={isHome ? "contained" : "outlined"}
              component={NavLink}
              to="/"
            >
              Home
            </Button>
            <Button
              variant={isUpload ? "contained" : "outlined"}
              component={NavLink}
              to="/upload"
            >
              Upload
            </Button>
            <Button
              variant={isGallery ? "contained" : "outlined"}
              component={NavLink}
              to="/gallery"
            >
              Gallery
            </Button>
          </Stack>
        </Grid>
        <Grid xs={3}>
          <Box justifyContent="center" alignItems="center" display="Flex">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={onStartNowClick}
            >
              Start Now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CreationDialog
        open={creationDialogOpen}
        onClose={onCreationDialogClose}
        maxWidth="md"
        fullWidth
      />
    </Box>
  );
}
