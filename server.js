import fs from "node:fs/promises";

import express from "express";
import { loadEnv } from "vite";

const env = loadEnv(env.NODE_ENV, process.cwd(), "");

// Constants
const isProduction = env.NODE_ENV === "production";
const port = env.PORT || 5173;
const base = env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./build/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./build/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./build/server/entry-server.js")).render;
    }

    const rendered = await render(url);

    const html = template.replace("<!--app-head-->", rendered.head ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  const startMode = isProduction ? "production" : "development";
  console.log(`Server started at http://localhost:${port} as ${startMode} mode.`);
});
