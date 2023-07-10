import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { AxoTheme } from "./theme";

export const AppTheme = ({ children }: { children: JSX.Element }) => (
  <ThemeProvider theme={AxoTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
