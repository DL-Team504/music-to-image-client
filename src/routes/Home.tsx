import { Button, Container, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/upload");
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
        py: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{
            background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light} 80%);`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to LunarBeats!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ mb: 3, maxWidth: "600px" }}
        >
          Upload your song and watch it come to life with a custom AI-generated
          image that captures the essence of your music. Discover the visual
          side of sound.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleButtonClick}
        >
          Generate Your Image
        </Button>
      </Box>
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "background.paper",
          py: 2,
          borderRadius: 2,
          mt: 2,
          mb: 2,
          boxShadow: 3,
          maxWidth: "md",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Why LunarBeats?
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ maxWidth: "700px", margin: "0 auto" }}
        >
          At LunarBeats, we believe music is more than just sound. It's an
          experience, a story, and a feeling. Our AI technology bridges the gap
          between sound and sight, giving you a visual representation of your
          music. Start your journey today and see your songs like never before.
        </Typography>
      </Container>
    </Box>
  );
}
