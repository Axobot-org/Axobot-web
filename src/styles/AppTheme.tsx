import { CssBaseline, ThemeProvider } from "@mui/material";
import type { JSX } from "react";

import { AxoTheme } from "./theme";

export const AppTheme = ({ children }: { children: JSX.Element }) => (
  <ThemeProvider theme={AxoTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
