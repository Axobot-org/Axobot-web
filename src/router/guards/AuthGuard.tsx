import { useEffect } from "react";

import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";
import { ExternalRoutesURLs } from "../router";


export default function AuthGuard({ children }: {children: JSX.Element}) {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = ExternalRoutesURLs.discordAuth;
    }
  }, [isAuthenticated]);
  return children;

}