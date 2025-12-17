import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.PUBLIC_URL,
    server: {
      port: env.PORT ? Number(env.PORT) : undefined,
    },
    build: {
      outDir: "build",
      rollupOptions: isSsrBuild
        ? {
          input: ["virtual:react-router/server-build"],
        }
        : undefined,
    },
    plugins: [
      reactRouter(),
      svgr(),
    ],
  };
});
