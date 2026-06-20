import { Fragment, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";

import PageTitle from "../components/common/PageTitle";
import { useLogin } from "../repository/redux/dispatchs/useLogin";
import useQuery from "../router/useQuery";
import { ExternalRoutesURLs } from "../routes";

export default function DiscordLoginCallback() {
  const code = useQuery().get("code");
  const navigate = useNavigate();
  const usedCode = useRef<string | null>(null);

  const { loginCommand, error, loading, data } = useLogin();

  const message = useMemo(() => {
    if (error) {
      return "Oops, something went wrong!";
    } else if (loading) {
      return "Relax, we're taking care of your Discord connection...";
    } else if (data) {
      return "You're logged in!";
    } else {
      return "Oops, something went wrong! You shouldn't be here, that's annoying.";
    }
  }, [error, loading, data]);

  useEffect(() => {
    if (data || loading || error || usedCode.current === code) {
      return;
    }
    if (code) {
      usedCode.current = code;
      loginCommand(code);
    } else {
      window.location.href = ExternalRoutesURLs.discordAuth;
    }
  }, [code, data, loading, error, loginCommand]);

  // redirect to home if data is found
  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Fragment>
      <PageTitle text="Discord Login Callback" />
      <p>{message}</p>
    </Fragment>
  );
}
