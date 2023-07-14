import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import PublicLayout from "../pages/layouts/PublicLayout";
import getDiscordAuthUrl from "../repository/getDiscordAuthUrl";
import { privateRoutes as authenticatedRoutes } from "./routes/authenticatedRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { unauthenticatedRoutes } from "./routes/unauthenticatedRoutes";


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
      ...publicRoutes,
      ...unauthenticatedRoutes,
      ...authenticatedRoutes,
    ],
  },
]);

export default router;