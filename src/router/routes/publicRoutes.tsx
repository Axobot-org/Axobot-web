import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";
import TOS from "../../pages/legal/TOS";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/tos",
    Component: TOS,
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