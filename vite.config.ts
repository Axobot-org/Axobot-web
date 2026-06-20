import assert from "assert";

import { reactRouter } from "@react-router/dev/vite";
import { ManualChunkMeta } from "rollup";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

const CHUNKS = {
  vendor: [
    "/node_modules/react-dom/",
    "/node_modules/@reduxjs/toolkit/",
    "/src/repository/redux/",
    "/src/repository/commands/useIsAuthenticated",
  ],
  icons: ["/node_modules/@mui/icons-material/"],
  guards: ["/src/router/guards/"],
};

function manualChunk(id: string, meta: ManualChunkMeta): string | null {
  for (const [chunkName, chunkModules] of Object.entries(CHUNKS)) {
    if (chunkModules.some((module) => id.includes(module))) {
      return chunkName;
    }
  }
  return null;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");

  assert(!!env.PUBLIC_URL, "PUBLIC_URL must be defined in the environment variables.");

  const publicUrl = env.PUBLIC_URL.endsWith("/") ? env.PUBLIC_URL : env.PUBLIC_URL + "/";

  return {
    base: publicUrl,
    server: {
      port: env.PORT ? Number(env.PORT) : undefined,
    },
    build: {
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks: isSsrBuild ? undefined : manualChunk,
        },
      },
    },
    plugins: [reactRouter(), svgr()],
  };
});
