import { createTheme, LinkProps } from "@mui/material";

import LinkBehavior from "./LinkBehavior";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      background1: string;
      background2: string;
      background3: string;
    }
  }

  interface PaletteOptions {
    custom: {
      background1: string;
      background2: string;
      background3: string;
    }
  }
}

export const AxoTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#ff66b3",
    },
    secondary: {
      main: "#26d2ea",
    },
    custom: {
      background1: "#1f1f1f",
      background2: "#2f2f2f",
      background3: "#3f3f3f",
    },
  },
});

