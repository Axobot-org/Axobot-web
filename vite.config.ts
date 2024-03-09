import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.PUBLIC_URL,
    server: {
      port: env.PORT ? Number(env.PORT) : undefined,
    },
    plugins: [
      react(),
      svgr(),
    ]
  };
})
