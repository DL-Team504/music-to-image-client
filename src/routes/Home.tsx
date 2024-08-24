import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box paddingX={8}>
      <Stack spacing={2}>
        <Box position="relative" height={500}>
          <img
            src={"https://images.unsplash.com/photo-1712609934576-083090663a8f"}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              position: "absolute",
              left: "50%",
              bottom: 10,
              transform: "translate(-50%)",
              width: "100%",
            }}
          >
            Visualize your playlist: LunarBeats <br /> transforms music into
            art.
          </Typography>
        </Box>
        <Typography variant="h3" textAlign="center">
          Discover Our Latest App for AI Music Picture Generation
        </Typography>
        <Typography variant="h4" textAlign="center">
          Explore the new features and capabilities in our latest release
        </Typography>
      </Stack>
    </Box>
  );
}
