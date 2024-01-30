declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_DISCORD_AUTH_REDIRECT: string;
    REACT_APP_API_URL: string;
    REACT_APP_DISCORD_CLIENT_ID: string;
    REACT_APP_MATOMO_URL: string;
  }
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.ttf";