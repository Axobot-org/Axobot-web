import { RouteObject } from "react-router-dom";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("../../pages/Home"),
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
