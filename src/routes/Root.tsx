import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { theme } from "@/theme";
import { Header } from "@/Components";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          maxWidth: 1500,
          margin: "auto",
        }}
      >
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            marginTop: "80px", // Adjust based on actual header height
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
