import { Navigate, Outlet } from "react-router";

import LoadingPage from "../../pages/genericPages/LoadingPage";
import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function UnAuthGuardS() {
  const { isAuthenticated, loading } = useIsAuthenticated();

  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    console.log("UnAuthGuard: user is authenticated, redirecting to home");
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
