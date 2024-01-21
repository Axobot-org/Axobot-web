import { createTheme, LinkProps } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

import MPlus2 from "./fonts/MPLUS2-VariableFont_wght.ttf";
import PoppinsBold from "./fonts/Poppins-Bold.ttf";
import PoppinsBoldItalic from "./fonts/Poppins-BoldItalic.ttf";
import PoppinsRegularItalic from "./fonts/Poppins-Italic.ttf";
import PoppinsRegular from "./fonts/Poppins-Regular.ttf";
import PoppinsThin from "./fonts/Poppins-Thin.ttf";
import PoppinsThinItalic from "./fonts/Poppins-ThinItalic.ttf";
import LinkBehavior from "./LinkBehavior";

declare module "@mui/material/styles" {
  interface Palette {
    blurple: Palette["primary"];
    custom: {
      background1: string;
      background2: string;
      background3: string;
    }
  }

  interface PaletteOptions {
    blurple: Palette["primary"];
    custom: {
      background1: string;
      background2: string;
      background3: string;
    }
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blurple: true;
  }
}

const HeaderStyle: TypographyOptions = {
  "fontFamily": [
    "Poppins",
    "Roboto",
    "sans-serif",
  ].join(","),
};


export const AxoTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'M PLUS 2';
          src: local('M PLUS 2'), url(${MPlus2}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          src: local('Poppins'), local('Poppins-bold'), url(${PoppinsBold}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          font-style: italic;
          src: local('Poppins'), local('Poppins-bold-italic'), url(${PoppinsBoldItalic}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          src: local('Poppins'), local('Poppins-regular'), url(${PoppinsRegular}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          font-style: italic;
          src: local('Poppins'), local('Poppins-regular'), url(${PoppinsRegularItalic}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          src: local('Poppins'), local('Poppins-thin'), url(${PoppinsThin}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          font-style: italic;
          src: local('Poppins'), local('Poppins-thin'), url(${PoppinsThinItalic}) format('truetype');
        }
      `,
    },
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
    blurple: {
      main: "#5865F2",
      light: "#7289DA",
      dark: "#454FBF",
      contrastText: "#fff",
    },
    custom: {
      background1: "#1f1f1f",
      background2: "#2f2f2f",
      background3: "#3f3f3f",
    },
  },
  typography: {
    h1: HeaderStyle,
    h2: HeaderStyle,
    h3: HeaderStyle,
    h4: HeaderStyle,
    h5: HeaderStyle,
    fontFamily: [
      "'M PLUS 2'",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

