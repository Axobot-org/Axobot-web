import { useState } from "react";

import useSetUser from "../redux/dispatchs/useSetUser";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { AuthenticatedUserObject } from "../types/users";

export function useFetchMe() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthenticatedUserObject | null>(null);

  const token = useTokenSelector();
  const { setUserCommand } = useSetUser();

  async function getMeCommand() {
    setLoading(true);
    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/auth/me",
        {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as AuthenticatedUserObject;
        setData(json);
        setUserCommand(json);
      } else {
        setError("Invalid token");
      }
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { getMeCommand, error, loading, data };
}