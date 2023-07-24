import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

const theme = createTheme({
  typography: {
    fontFamily: "poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#8b5cf6",
    },
    secondary: {
      main: "#D0F65C",
    },
    text: {
      primary: "#131117",
    },
    background: {
      default: "#f7f6f8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      },
    },
  },
});

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default CustomThemeProvider;
