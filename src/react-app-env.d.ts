/* eslint-disable spaced-comment */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare namespace NodeJS {
  interface ImportMeta {
    env: {
      NODE_ENV: "development" | "production" | "test";
      PUBLIC_URL: string;
      VITE_DISCORD_AUTH_REDIRECT: string;
      VITE_API_URL: string;
      VITE_DISCORD_CLIENT_ID: string;
      VITE_MATOMO_URL: string;
    }
  }
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.ttf";