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

import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs/promises";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import sirv from "sirv";
import { loadEnv } from "vite";

// @ts-ignore
import cspHashes from "./build/csp-hashes.json" with { type: "json" };

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
const DEFAULT_HTML_INDEX = path.join(BUILD_DIR, "client", "__spa-fallback.html");

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

const MATOMO_DOMAIN = new URL(env.VITE_MATOMO_URL).origin;
const CLOUDFLARE_DOMAIN = "https://static.cloudflareinsights.com";

/** Helmet for common security headers */
app.use(
  helmet({
    // Content-Security-Policy (CSP) configuration
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'", env.PUBLIC_URL, env.VITE_API_URL, CLOUDFLARE_DOMAIN, MATOMO_DOMAIN],
        frameAncestors: ["'self'"],
        fontSrc: ["'self'", "https:"],
        imgSrc: ["'self'", "data:", "https://cdn.discordapp.com"],
        objectSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          MATOMO_DOMAIN,
          CLOUDFLARE_DOMAIN,
          ...Object.values(cspHashes).flatMap((hashes) => hashes.map((/** @type {string} */ hash) => `'${hash}'`)),
        ].filter((origin) => typeof origin === "string" && origin.trim().length > 0),
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
    // Cross-Origin-Embedder-Policy (COEP) - ensures only CORS-safe resources are loaded
    crossOriginEmbedderPolicy: {
      policy: "credentialless",
    },
    // Cross-Origin-Opener-Policy (COOP) - isolates top-level browsing context
    crossOriginOpenerPolicy: {
      policy: "same-origin",
    },
    // Cross-Origin-Resource-Policy (CORP) - restricts which origins can load resources
    crossOriginResourcePolicy: {
      policy: "same-site",
    },
    // Referrer policy
    referrerPolicy: {
      policy: ["no-referrer", "strict-origin"],
    },
    // Strict-Transport-Security - enforce HTTPS
    strictTransportSecurity: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
    // Prevent MIME sniffing
    noSniff: true,
    // Prevent clickjacking
    xFrameOptions: {
      action: "deny",
    },
  })
);

/** Custom X-Robots-Tag headers */
app.use((_, res, next) => {
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
    origin: [env.PUBLIC_URL, env.VITE_API_URL, CLOUDFLARE_DOMAIN, MATOMO_DOMAIN]
      .filter((origin) => typeof origin === "string" && origin.trim().length > 0),
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
      setHeaders: (res) => {
        // Keep sirv from overwriting headers we've set above for fonts/images
        // Only set a default Cache-Control if none set
        if (!res.getHeader("Cache-Control")) {
          res.setHeader("Cache-Control", `public, max-age=${ONE_HOUR}`);
        }
      },
    })
  );
} catch (err) {
  console.warn(`[server] assets directory not found at ${ASSETS_DIR} — skipping sirv mount`, err);
}


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

  /** @type {string[]} */
  const candidatePaths = [];

  // if path is root
  if (urlPath === "/" || urlPath === "") {
    candidatePaths.push("index.html");
  } else {
    const clean = safe(urlPath);

    // try <clean>/index.html or <clean>.html (relative to PRERENDER_ROOT)
    candidatePaths.push(path.join(clean, "index.html"));
    candidatePaths.push(`${clean}.html`);
    // fallback to __spa-fallback.html
    candidatePaths.push("__spa-fallback.html");
  }

  for (const rel of candidatePaths) {
    try {
      const candidate = await fs.realpath(path.resolve(CLIENT_PUBLIC_DIR, rel));
      // Resolve symlinks and normalize the path, then ensure it stays within CLIENT_PUBLIC_DIR
      if (!candidate.startsWith(CLIENT_PUBLIC_DIR + path.sep) && candidate !== CLIENT_PUBLIC_DIR) {
        continue;
      }
      await fs.access(candidate);
      return candidate;
    } catch {
      // not found — try next
    }
  }

  return DEFAULT_HTML_INDEX;
}

// Define URL aliases for the /terms route
app.get("/tos", (_, res) => res.redirect(301, "/terms"));
app.get("/legal-notices", (_, res) => res.redirect(301, "/terms"));

/** -------------------------
 *  Explicitly serve prerendered pages for your preloaded list
 *  ------------------------- */

/**
 * Dynamically load prerendered routes from react-router.config.ts
 */
async function loadPrerenderedRoutes() {
  try {
    const configModule = await import("./react-router.config.ts");
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

/** Health check */
app.get("/_health", (_, res) => res.json({ ok: true }));

/** Fallback for anything else to build/spa_fallback.html to let the client SPA handle routing */
app.get("*", async (_, res) => {
  // serve HTML with conservative caching
  const data = await fs.readFile(DEFAULT_HTML_INDEX, "utf8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(data);
});

/** Start server */
app.listen(PORT, "localhost", () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Mode: ${mode}`);
  console.log(`Serving build dir: ${BUILD_DIR}`);
  console.log(`Assets dir (sirv): ${ASSETS_DIR}`);
});
