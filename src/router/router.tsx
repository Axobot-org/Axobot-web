import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PublicLayout from "../pages/layouts/PublicLayout";

const Documentation = () => {
  window.location.replace("https:/axobot.rtfd.io");
  return null;
};

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/documentation",
        element: <Documentation />,
      },
    ],
  },
]);

export default router;