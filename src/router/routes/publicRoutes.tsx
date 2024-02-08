import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";
import Leaderboard from "../../pages/Leaderboard";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/leaderboard/global",
    Component: Leaderboard,
  },
  {
    path: "/leaderboard/:id",
    Component: Leaderboard,
  },
];