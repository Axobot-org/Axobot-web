import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
];