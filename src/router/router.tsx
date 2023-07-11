import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../pages/layouts/PublicLayout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/dashboard",
        element: <h1>Dashboard</h1>,
      },
    ],
  },
]);

export default router;