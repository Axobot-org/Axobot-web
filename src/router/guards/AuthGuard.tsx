import LoadingPage from "../../pages/genericPages/LoadingPage";
import NeedsLoginErrorPage from "../../pages/genericPages/NeedsLoginErrorPage";
import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function AuthGuard({ children }: {children: JSX.Element}) {
  const { isAuthenticated, loading } = useIsAuthenticated();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <NeedsLoginErrorPage />;
  }

  return children;

}