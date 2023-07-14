import { Outlet, RouteObject } from "react-router-dom";

import DiscordLoginCallback from "../../pages/DiscordLoginCallback";
import UnAuthGuard from "../guards/UnAuthGuard";


export const unauthenticatedRoutes: RouteObject[] = [
  {
    element: (
      <UnAuthGuard>
        <Outlet />
      </UnAuthGuard>
    ),
    children: [
      {
        path: "/discord-callback",
        Component: DiscordLoginCallback,
      },
    ],
  },
];