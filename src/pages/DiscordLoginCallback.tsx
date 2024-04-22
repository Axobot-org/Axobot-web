import { Fragment, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import { useLogin } from "../repository/redux/dispatchs/useLogin";
import { ExternalRoutesURLs } from "../router/router";
import useQuery from "../router/useQuery";

export default function DiscordLoginCallback() {
  const code = useQuery().get("code");
  const navigate = useNavigate();

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

  let usedCode: string | null = null;
  useEffect(() => {
    if (data || loading || error || usedCode === code) {
      return;
    }
    if (code) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      usedCode = code;
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