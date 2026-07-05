import React from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

declare global {
  interface Window {
    _mtm?: Record<string, string | number | boolean | null | undefined>[];
  }
}

hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>,
);
