import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const publicUrl = env.PUBLIC_URL.endsWith("/") ? env.PUBLIC_URL : env.PUBLIC_URL + "/";

  return {
    base: publicUrl,
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
