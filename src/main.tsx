import { ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0.8125rem 1.5rem",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
