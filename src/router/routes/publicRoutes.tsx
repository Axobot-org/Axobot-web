import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/terms",
    lazy: () => import("../../pages/legal/TOS"),
  },
  {
    path: "/privacy",
    lazy: () => import("../../pages/legal/PrivacyPolicy"),
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