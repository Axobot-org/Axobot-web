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
    };
  }

  interface PaletteOptions {
    blurple: Palette["primary"];
    custom: {
      background1: string;
      background2: string;
      background3: string;
    };
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
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          src: local('Poppins'), local('Poppins-bold'), url(${PoppinsBold}) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          font-style: italic;
          src: local('Poppins'), local('Poppins-bold-italic'), url(${PoppinsBoldItalic}) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          src: local('Poppins'), local('Poppins-regular'), url(${PoppinsRegular}) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          font-style: italic;
          src: local('Poppins'), local('Poppins-regular'), url(${PoppinsRegularItalic}) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          src: local('Poppins'), local('Poppins-thin'), url(${PoppinsThin}) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          font-style: italic;
          src: local('Poppins'), local('Poppins-thin'), url(${PoppinsThinItalic}) format('truetype');
          font-display: swap;
        }
      `,
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: "hover",
        rel: "noopener",
      } as LinkProps,
      styleOverrides: {
        root: {
          "@media (prefers-contrast: more)": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        switchBase: {
          "&.Mui-checked": {
            color: "#fff",
            "& + .MuiSwitch-track": {
              opacity: 1,
              border: 0,
            },
          },
        },
        track: {
          borderRadius: 22 / 2,
        },
        thumb: ({ theme, ownerState }) => ({
          boxShadow: "none",
          width: 16,
          height: 16,
          margin: 2,
          ...(ownerState.checked && {
            color: "white",
            "@media (prefers-contrast: more)": {
              "&::before": {
                content: "''",
                position: "absolute",
                width: 16,
                height: 16,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                  theme.palette.primary.dark
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
              },
            },
          }),
        }),
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
    warning: {
      main: "#f0b132",
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
    h1: {
      ...HeaderStyle,
      fontSize: "4rem",
    },
    h2: {
      ...HeaderStyle,
      fontSize: "3.5rem",
    },
    h3: {
      ...HeaderStyle,
      fontSize: "2.5rem",
    },
    h4: {
      ...HeaderStyle,
      fontSize: "2rem",
    },
    h5: HeaderStyle,
    fontFamily: [
      "'M PLUS 2'",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

