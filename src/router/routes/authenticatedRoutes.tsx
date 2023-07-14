import { Outlet, RouteObject } from "react-router-dom";

import Dashboard from "../../pages/Dashboard";
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
        path: "/dashboard",
        Component: Dashboard,
      },
    ],
  },
];