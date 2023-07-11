import { useState } from "react";

import { isFetchError } from "../typesGuards";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loginCommand(discordCode: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify({ code: discordCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        setError("Invalid code");
      }
    } catch (err) {
      setError(isFetchError(err) ? err.message : "Unknown error");
      console.error(err);
    }
    setLoading(false);
  }

  return { loginCommand, error, loading };
};