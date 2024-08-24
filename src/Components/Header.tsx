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

  // const { pathname } = useLocation();
  const isHome = useMatch("/");
  const isGallery = useMatch("/gallery");

  const onStartNowClick = () => {
    setCreationDialogOpen(true);
  };

  const onCreationDialogClose = () => {
    setCreationDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }} marginBottom={10} marginTop={3}>
      <Grid container alignItems="center">
        <Grid xs={3}>
          <Box justifyContent="center" alignItems="center" padding={2}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light} 80%);`,
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
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
              variant={isGallery ? "contained" : "outlined"}
              component={NavLink}
              to="/gallery"
            >
              Gallery
            </Button>
            <Button variant="outlined">Pricing</Button>
            <Button variant="outlined">About</Button>
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
