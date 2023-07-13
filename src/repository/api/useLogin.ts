import { useState } from "react";

import useSetToken from "../redux/dispatchs/useSetToken";
import useSetUser from "../redux/dispatchs/useSetUser";
import { isFetchError } from "../typesGuards";

interface LoginJSONResponse {
  token: string;
  id: string;
  username: string;
  global_name: string;
  avatar: string;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginJSONResponse | null>(null);

  const { setTokenCommand } = useSetToken();
  const { setUserCommand } = useSetUser();

  async function loginCommand(discordCode: string) {
    setLoading(true);
    setError(null);

    const urlParams = new URLSearchParams({
      code: discordCode,
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/auth/discord-callback?" + urlParams,
        {
          method: "POST",
        });
      if (response.status === 200) {
        const json = await response.json() as LoginJSONResponse;
        setData(json);
        setTokenCommand(json.token);
        setUserCommand({
          id: json.id,
          username: json.username,
          globalName: json.global_name,
          avatar: json.avatar,
        });
      } else {
        setError("Invalid code");
      }
    } catch (err) {
      setError(isFetchError(err) ? err.message : "Unknown error");
      console.error(err);
    }
    setLoading(false);
  }

  return { loginCommand, error, loading, data };
}