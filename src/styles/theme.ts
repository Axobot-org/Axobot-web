import { createTheme, LinkProps } from "@mui/material";

import LinkBehavior from "./LinkBehavior";

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
  },
});

