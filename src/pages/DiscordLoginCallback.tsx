import { useEffect, useMemo } from "react";

import { useLogin } from "../repository/api/useLogin";
import useSetToken from "../repository/redux/dispatchs/useSetToken";
import useSetUser from "../repository/redux/dispatchs/useSetUser";
import { ExternalRoutesURLs } from "../router/router";
import useQuery from "../router/useQuery";

export default function DiscordLoginCallback() {
  const code = useQuery().get("code");

  const { setTokenCommand } = useSetToken();
  const { setUserCommand } = useSetUser();
  const { loginCommand, error, loading, data } = useLogin();

  const message = useMemo(() => {
    if (error) {
      return error;
    } else if (loading) {
      return "Relax, we're taking care of your Discord connection...";
    } else if (data) {
      setTokenCommand(data.token);
      setUserCommand({ id: data.user_id });
      return "You're logged in!";
    } else {
      return "Oops, something went wrong! You shouldn't be here, that's annoying.";
    }
  }, [error, loading, data, setTokenCommand, setUserCommand]);

  useEffect(() => {
    if (code && !loading && !error && !data) {
      loginCommand(code);
    } else {
      window.location.href = ExternalRoutesURLs.discordAuth;
    }
  }, [code, data, error, loading, loginCommand]);

  return (
    <div>
      <h1>Discord Login Callback</h1>
      <p>{message}</p>
    </div>
  );
}