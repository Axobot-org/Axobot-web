import { useEffect } from "react";

import LoadingPage from "../../pages/LoadingPage";
import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";
import { ExternalRoutesURLs } from "../router";


export default function AuthGuard({ children }: {children: JSX.Element}) {
  const { isAuthenticated, loading } = useIsAuthenticated();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = ExternalRoutesURLs.discordAuth;
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <LoadingPage />;
  }

  return children;

}