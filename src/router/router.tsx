import { Stack } from "@mui/material";
import { createBrowserRouter } from "react-router";

import ErrorPage from "../pages/genericPages/ErrorPage";
import LoadingPage from "../pages/genericPages/LoadingPage";
import RouterPublicLayout from "../pages/layouts/PublicLayout";
import getBotInviteUrl from "../repository/getBotInviteUrl";
import getDiscordAuthUrl from "../repository/getDiscordAuthUrl";
import { privateRoutes as authenticatedRoutes } from "./routes/authenticatedRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { unauthenticatedRoutes } from "./routes/unauthenticatedRoutes";


export const ExternalRoutesURLs = {
  documentation: "https://axobot.rtfd.io",
  donate: "https://github.com/sponsors/ZRunner",
  supportServer: "https://discord.gg/mEBFnfujtX",
  discordAuth: getDiscordAuthUrl(),
  botInvite: getBotInviteUrl(),
};


const router = createBrowserRouter([
  {
    element: <RouterPublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
      ...unauthenticatedRoutes,
      ...authenticatedRoutes,
    ],
    HydrateFallback: RouteLoadingFallback,
  },
]);

export default router;


function RouteLoadingFallback() {
  return (
    <Stack height="100vh" alignItems="center">
      <LoadingPage />
    </Stack>
  );
}
