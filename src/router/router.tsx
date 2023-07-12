import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DiscordLoginCallback from "../pages/DiscordLoginCallback";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PublicLayout from "../pages/layouts/PublicLayout";
import getDiscordAuthUrl from "../repository/api/getDiscordAuthUrl";


export const ExternalRoutesURLs = {
  documentation: "https://axobot.rtfd.io",
  supportServer: "https://discord.gg/N55zY88",
  discordAuth: getDiscordAuthUrl(),
};


const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/discord-callback",
        Component: DiscordLoginCallback,
      },
    ],
  },
]);

export default router;