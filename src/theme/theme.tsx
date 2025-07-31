import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#328e6e", // dark green
    },
    background: {
      default: "#acd3a8", // This sets the background color for the entire app
      paper: "#ffffff", // Background color for Paper components
    },
  },
});
