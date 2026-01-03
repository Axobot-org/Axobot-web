import { Outlet } from "react-router";

import LoadingPage from "../../pages/genericPages/LoadingPage";
import NeedsLoginErrorPage from "../../pages/genericPages/NeedsLoginErrorPage";
import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function AuthGuard() {
  const { isAuthenticated, loading } = useIsAuthenticated();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <NeedsLoginErrorPage />;
  }

  return <Outlet />;
}
