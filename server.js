import fs from "node:fs/promises";

import express from "express";
import RateLimit from "express-rate-limit";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = env.PORT || 5173;
const base = env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./build/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();

// Create the global rate limit (max 100 requests per 15min)
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});
app.use(limiter);


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

// Define static HTTP headers
const defaultSrcPolicy = isProduction ? "default-src https:" : "";
const scriptSrcPolicy = isProduction ? `script-src-elem ${env.PUBLIC_URL} ${env.VITE_API_URL} https://zrunner.me` : "";
const styleSrcPolicy = isProduction ? "style-src 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='" : "";
const headers = {
  "Content-Security-Policy": `frame-ancestors 'none'; upgrade-insecure-requests; ${defaultSrcPolicy}; ${scriptSrcPolicy}; ${styleSrcPolicy}; img-src 'self' https://cdn.discordapp.com`,
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-site",
  "Referrer-Policy": "no-referrer, strict-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};


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

    res.status(200).header(headers).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.sendStatus(500);
  }
});

// Start http server
app.listen(port, () => {
  const startMode = isProduction ? "production" : "development";
  console.log(`Server started at http://localhost:${port} as ${startMode} mode.`);
});
