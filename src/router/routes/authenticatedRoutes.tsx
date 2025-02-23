import { Outlet, RouteObject } from "react-router-dom";

import AuthGuard from "../guards/AuthGuard";


export const privateRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard/",
        lazy: () => import("../../pages/Dashboard"),
      }, {
        path: "/dashboard/:id/*",
        lazy: () => import("../../pages/GuildDashboard"),
      },
    ],
  },
];
