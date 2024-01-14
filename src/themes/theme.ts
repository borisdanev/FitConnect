import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#00e676",
      contrastText: "#fff",
    },
    ...(mode === "dark" && {
      // palette values for dark mode
      // primary: "#fff",
      // divider: deepOrange[700],
      background: {
        default: "#29332E",
        paper: "#29332E",
      },
      // text: {
      //   primary: "#fff",
      //   secondary: grey[500],
      // },
    }),
  },
});
export const darkTheme = createTheme(getDesignTokens("dark"));
