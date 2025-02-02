import { createTheme, LinkProps } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

import LinkBehavior from "./LinkBehavior";

declare module "@mui/material/styles" {
  interface Palette {
    blurple: Palette["primary"];
    gray: Palette["primary"];
    custom: {
      background1: string;
      background2: string;
      background3: string;
    };
  }

  interface PaletteOptions {
    blurple: Palette["primary"];
    gray: Palette["primary"];
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
    gray: true;
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
          src: local('M PLUS 2'), url(/assets/fonts/MPLUS2-VariableFont-latin.woff) format('woff');
          font-display: swap;
        }
        @font-face {
          font-family: 'M PLUS 2 ext';
          src: local('M PLUS 2'), url(/assets/fonts/MPLUS2-VariableFont-extended.woff) format('woff');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          src: local('Poppins'), local('Poppins-bold'), url(/assets/fonts/Poppins-Bold.ttf) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 500;
          font-style: italic;
          src: local('Poppins'), local('Poppins-bold-italic'), url(/assets/fonts/Poppins-BoldItalic.ttf) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          src: local('Poppins'), local('Poppins-regular'), url(/assets/fonts/Poppins-Regular.ttf) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 300;
          font-style: italic;
          src: local('Poppins'), local('Poppins-regular'), url(/assets/fonts/Poppins-Italic.ttf) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          src: local('Poppins'), local('Poppins-thin'), url(/assets/fonts/Poppins-Thin.ttf) format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-weight: 200;
          font-style: italic;
          src: local('Poppins'), local('Poppins-thin'), url(/assets/fonts/Poppins-ThinItalic.ttf) format('truetype');
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
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        switchBase: ({ theme }) => ({
          "&.Mui-checked": {
            color: "#fff",
            "& + .MuiSwitch-track": {
              opacity: 1,
              border: 0,
            },
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.palette.grey[600],
          },
        }),
        track: {
          borderRadius: 22 / 2,
        },
        thumb: ({ ownerState }) => ({
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
                color: "red",
                width: 16,
                height: 16,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: "url('/assets/checkmark.svg')",
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
    gray: {
      main: "#747f8d",
      light: "#b9bbbe",
      dark: "#4f545c",
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
      "'M PLUS 2 ext'",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

