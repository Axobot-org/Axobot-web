import { useState } from "react";

import { isFetchError } from "../typesGuards";

interface LoginJSONResponse {
  token: string;
  user_id: string;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginJSONResponse | null>(null);

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
        setData(await response.json());
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