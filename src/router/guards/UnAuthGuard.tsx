import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function UnAuthGuard({ children }: {children: JSX.Element}) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;

}