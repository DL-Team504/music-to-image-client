import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E53F71",
    },
    secondary: {
      main: "#e5603f",
    },
    success: {
      main: "#71e53f",
    },
    warning: {
      main: "#e5b33f",
    },
    background: {
      paper: "#0b0d0e",
      default: "#000000",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
