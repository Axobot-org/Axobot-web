import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/tos",
    lazy: () => import("../../pages/legal/TOS"),
  },
  {
    path: "/leaderboard/global",
    lazy: () => import("../../pages/Leaderboard"),
  },
  {
    path: "/leaderboard/:id",
    lazy: () => import("../../pages/Leaderboard"),
  },
];