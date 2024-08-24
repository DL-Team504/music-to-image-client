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
      <Box maxWidth={1500} margin="auto">
        <Header />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
