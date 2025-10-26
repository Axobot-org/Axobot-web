import { Outlet, RouteObject } from "react-router";

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
