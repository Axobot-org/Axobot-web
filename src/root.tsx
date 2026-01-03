import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import store from "./repository/redux/store";
import { AppTheme } from "./styles/AppTheme";
import { PublicLayout } from "./pages/layouts/PublicLayout";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff66b3" />
        <meta name="description" content="A friendly website for your Axobot Discord bot." />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/logo512.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:description" content="A friendly website for your Axobot Discord bot." />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />

        <link rel="dns-prefetch" href="https://cdn.discordapp.com" />
        <link rel="preload" href="/assets/fonts/MPLUS2-VariableFont-latin.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Poppins-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://zrunner.me" crossOrigin="anonymous" />
        <link rel="preconnect" href={import.meta.env.VITE_API_URL} crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <Provider store={store}>
      <AppTheme>
        <PublicLayout />
      </AppTheme>
    </Provider>
  );
}

export default function Root() {
  useEffect(() => {
    const _mtm = window._mtm = window._mtm || [];
    _mtm.push({ "mtm.startTime": (new Date().getTime()), "event": "mtm.Start" });
    const d = document;
    const g = d.createElement("script");
    const s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = import.meta.env.VITE_MATOMO_URL;
    if (s.parentNode) {
      s.parentNode.insertBefore(g, s);
    } else {
      console.warn("Could not insert Matomo script: no script tag found");
    }
  }, []);

  return (
    <Provider store={store}>
      <AppTheme>
        <Outlet />
      </AppTheme>
    </Provider>
  );
}
