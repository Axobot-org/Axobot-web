import { useState } from "react";

import useLogout from "../redux/dispatchs/useLogout";
import useSetUser from "../redux/dispatchs/useSetUser";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { AuthenticatedUserObject } from "../types/users";

export function useFetchMe() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthenticatedUserObject | null>(null);

  const token = useTokenSelector();
  const { setUserCommand } = useSetUser();
  const { logoutCommand } = useLogout();

  async function fetchMeCommand() {
    setLoading(true);
    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/me",
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
      } else if (response.status === 401) {
        setError("Invalid token");
        logoutCommand();
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

  return { fetchMeCommand, error, loading, data };
}