// @ts-check
/**
 * server.js
 * Minimal Express server to serve a React-Router prerendered SPA build
 *
 * Features:
 * - Loads PORT from Vite's loadEnv (so values from .env.* are available)
 * - rate limiting (global window)
 * - compression
 * - sirv for static assets at ./build/client/assets
 * - CORS (flexible, echoes origin so cookies/credentials work)
 * - COOP, CORP, X-Frame-Options and other security headers
 * - special Cache-Control for images & fonts (long max-age & immutable)
 *
 * Usage: node server.js
 */

import express from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import sirv from "sirv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import fs from "fs/promises";
import { loadEnv } from "vite";

/** Load environment via Vite's loadEnv so .env, .env.production etc. are picked up */
const mode = process.env.NODE_ENV || "production";
const env = loadEnv(mode, process.cwd(), ""); // returns map of strings
const PORT = Number(env.PORT || process.env.PORT || 3000);

/** Build output layout used in template:
 * - Static assets: ./build/client/assets
 * - Prerendered HTML: ./build/... (we try multiple candidate locations)
 */
const BUILD_DIR = path.resolve(process.cwd(), "build");
const CLIENT_PUBLIC_DIR = path.join(BUILD_DIR, "client");
const ASSETS_DIR = path.resolve(CLIENT_PUBLIC_DIR, "assets");

const app = express();

// Use the Proxy level config
if (env.PROXY_LEVEL && Number(env.PROXY_LEVEL) > 0) {
  app.set("trust proxy", Number(env.PROXY_LEVEL));
}

/** Compression: gzip/deflate for responses */
app.use(compression());

/** Log every request to the console */
morgan.token("date", (req) => {
  const date = "_startTime" in req && req._startTime instanceof Date
    ? req._startTime
    : new Date();
  const paddedDay = date.getDate().toString().padStart(2, "0");
  const paddedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const paddedHours = date.getHours().toString().padStart(2, "0");
  const paddedMinutes = date.getMinutes().toString().padStart(2, "0");
  const paddedSeconds = date.getSeconds().toString().padStart(2, "0");
  return `${paddedDay}/${paddedMonth}/${date.getFullYear()} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
});
app.use(morgan("\x1b[94m[:date]\x1b[0m \x1b[93m:remote-addr\x1b[0m :method :status :url - :response-time ms"));

/** Rate limiter: global window. Values can be overridden via env:
 * RATE_WINDOW_MS (ms) and RATE_MAX (requests)
 */
const RATE_WINDOW_MS = Number(env.RATE_WINDOW_MS || process.env.RATE_WINDOW_MS) || 15 * 60 * 1000; // 15m
const RATE_MAX = Number(env.RATE_MAX || process.env.RATE_MAX) || 500;

const limiter = rateLimit({
  windowMs: RATE_WINDOW_MS,
  max: RATE_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests — try again later.",
});
app.use(limiter);

/** Helmet for common security headers, then explicit additional headers */
app.use(
  helmet({
    // allow us to manually set some COOP/CORP headers below
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    // we still get defaults for other helpful headers
  })
);

/** Custom security headers */
app.use((req, res, next) => {
  // Cross-Origin-Embedder-Policy (COEP) - ensures only CORS-safe resources are loaded
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");

  // Cross-Origin-Opener-Policy (COOP) - isolates top-level browsing context
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // Cross-Origin-Resource-Policy (CORP) - restricts which origins can load resources
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");

  // Referrer policy
  res.setHeader("Referrer-Policy", "no-referrer, strict-origin");

  // Strict-Transport-Security - enforce HTTPS
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  // Prevent MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  if (env.NO_INDEX === "true") {
    res.setHeader("X-Robots-Tag", "noindex");
  }

  next();
});

/** Fully-functional CORS:
 * - Echoes Origin (so credentials are allowed when needed)
 * - Credentials allowed
 * - Common HTTP methods and headers allowed
 *
 * You can replace the origin function to whitelist allowed origins.
 */
app.use(
  cors({
    origin: [env.PUBLIC_URL, env.VITE_API_URL, "https://static.cloudflareinsights.com", "https://zrunner.me"],
    credentials: true,
    methods: ["GET", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Content-Length"],
    optionsSuccessStatus: 204,
  })
);

/** -------------------------
 *  Static assets with sirv + custom cache logic for images & fonts
 *  ------------------------- */

/**
 * Cache strategy:
 * - Images & fonts: long cache (1 year) + immutable
 * - Other assets: moderate cache (1 hour)
 * - HTML: no-cache / must-revalidate (served below)
 */
const ONE_HOUR = 60 * 60;
const ONE_YEAR = 365 * 24 * 60 * 60;

/** Middleware to set cache headers for assets by extension */
app.use((req, res, next) => {
  // Only apply to asset requests (we map sirv under /assets)
  // Use URL path (without query) to determine extension
  const urlPath = req.path || "";
  // images
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff)(\?.*)?$/i.test(urlPath)) {
    res.setHeader("Cache-Control", `public, max-age=${ONE_YEAR}, immutable`);
  } else if (/\.(ttf|otf|woff2?|eot)(\?.*)?$/i.test(urlPath)) {
    // fonts
    res.setHeader("Cache-Control", `public, max-age=${ONE_YEAR}, immutable`);
  } else if (/\.(js|css|map)(\?.*)?$/i.test(urlPath)) {
    // JS/CSS bundles - shorter but cachable
    res.setHeader("Cache-Control", `public, max-age=${ONE_HOUR}, must-revalidate`);
  }
  // else leave for sirv or route handler (HTML will be set explicitly)
  next();
});

/** Use sirv to serve the client assets folder */
try {
  // only mount sirv if assets directory exists - fail gracefully otherwise
  await fs.access(ASSETS_DIR);
  app.use(
    "/assets",
    sirv(ASSETS_DIR, {
      dev: false,
      // sirv's own caching is okay — we've already set our headers where needed
      etag: true,
      maxAge: ONE_HOUR,
      setHeaders: (res, pathname) => {
        // Keep sirv from overwriting headers we've set above for fonts/images
        // Only set a default Cache-Control if none set
        if (!res.getHeader("Cache-Control")) {
          res.setHeader("Cache-Control", `public, max-age=${ONE_HOUR}`);
        }
      },
    })
  );
} catch (err) {
  console.warn(`[server] assets directory not found at ${ASSETS_DIR} — skipping sirv mount`);
}


await fs.access(CLIENT_PUBLIC_DIR);
app.use(
  sirv(CLIENT_PUBLIC_DIR, {
    dev: false,
    etag: true,
    single: false,
    setHeaders: (res, pathname) => {
      // Long cache for icons, images, fonts, sitemap
      if (/\.(png|jpe?g|gif|webp|avif|svg|ico|xml|json|woff2?|ttf|otf|eot)$/i.test(pathname)) {
        res.setHeader("Cache-Control", `public, max-age=${ONE_YEAR}, immutable`);
      } else {
        // conservative cache for other root files
        res.setHeader("Cache-Control", `public, max-age=${ONE_HOUR}, must-revalidate`);
      }
    },
  })
);


/**
 * -------------------------
 * Helper: resolve prerendered HTML for a route
 * -------------------------
 * Given a URL path like "/", "/terms" or "/some/page",
 * try to find the best prerendered HTML file:
 * - build/client/<route>/index.html
 * - build/client/<route>.html
 * - build/__spa-fallback.html  (fallback)
 * 
 * Returns absolute path to HTML file.
 * 
 * @param {string} urlPath
 */
async function resolveHtmlForRoute(urlPath) {
  // normalize paths
  const safe = (/** @type {string} */ p) =>
    p
      .replace(/^\//, "")
      .replace(/\?.*$/, "")
      .replace(/\/$/, ""); // "terms/sub" etc.

  const candidatePaths = [];

  // if path is root
  if (urlPath === "/" || urlPath === "") {
    candidatePaths.push(path.join(BUILD_DIR, "client", "index.html"));
  } else {
    const clean = safe(urlPath);

    // try /build/client/<clean>/index.html or /build/client/<clean>.html
    candidatePaths.push(path.join(BUILD_DIR, "client", clean, "index.html"));
    candidatePaths.push(path.join(BUILD_DIR, "client", `${clean}.html`));
    // fallback to build/__spa-fallback.html
    candidatePaths.push(path.join(BUILD_DIR, "client", "__spa-fallback.html"));
  }

  for (const p of candidatePaths) {
    try {
      await fs.access(p);
      return p;
    } catch (e) {
      // not found — try next
    }
  }

  // final fallback: return build/index.html even if missing (will error later)
  return path.join(BUILD_DIR, "client", "__spa-fallback.html");
}

/** -------------------------
 *  Explicitly serve prerendered pages for your preloaded list
 *  ------------------------- */

/**
 * Dynamically load prerendered routes from react-router.config.ts
 */
async function loadPrerenderedRoutes() {
  try {
    const configPath = path.resolve(process.cwd(), "react-router.config.ts");
    const configModule = await import(configPath);
    const prerender = configModule?.default?.prerender;

    if (Array.isArray(prerender)) {
      return prerender;
    }
  } catch (err) {
    console.warn("[server] Failed to load react-router.config.ts prerender list", err);
  }

  return [];
}

const PRELOADED_ROUTES = await loadPrerenderedRoutes();
console.debug(`[server] Preloaded routes: ${PRELOADED_ROUTES.join(", ")}`);

/** Serve prerendered HTML for each preloaded route */
for (const route of PRELOADED_ROUTES) {
  app.get(route, async (req, res, next) => {
    try {
      const htmlPath = await resolveHtmlForRoute(route);
      // best effort: read and send the HTML file with conservative caching for HTML
      const html = await fs.readFile(htmlPath, { encoding: "utf8" });
      // HTML should be fresh
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch (err) {
      // if file doesn't exist or read fails, pass to fallback (SPA index) or next
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[server] Failed to serve prerendered page for ${route}:`, errMsg);
      next();
    }
  });
}

/** Fallback for anything else:
 * - Serve prerendered HTML if it exists (resolveHtmlForRoute)
 * - Otherwise fallback to build/index.html to let the client SPA handle routing
 */
app.get("*", async (req, res) => {
  const urlPath = req.path;
  try {
    const htmlPath = await resolveHtmlForRoute(urlPath);
    // serve HTML with conservative caching
    let data = await fs.readFile(htmlPath, "utf8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(data);
  } catch (err) {
    // if nothing found, respond 404
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[server] Could not resolve HTML for ${urlPath}:`, errMsg);
    res.status(404).send("Not found");
  }
});

/** Health check */
app.get("/_health", (req, res) => res.json({ ok: true }));

/** Start server */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Mode: ${mode}`);
  console.log(`Serving build dir: ${BUILD_DIR}`);
  console.log(`Assets dir (sirv): ${ASSETS_DIR}`);
});
