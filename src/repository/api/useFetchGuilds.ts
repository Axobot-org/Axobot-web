import { useState } from "react";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { GuildState } from "../redux/slices/guildSlice";


type ApiResponse = Exclude<GuildState, null>[0][];

export function useFetchGuilds() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const token = useTokenSelector();

  async function fetchGuildsCommand() {
    setLoading(true);
    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const URL = import.meta.env.VITE_API_URL + "/discord/@me/guilds";

    const headers = { "Authorization": token }

    try {
      const response = await fetch(
        URL,
        {
          method: "GET",
          headers: headers,
        });
        if (response.status === 200) {
          const json = await response.json() as ApiResponse;
          setData(json);
        } else if ([400, 401, 404].includes(response.status)) {
          try {
            const body = await response.text();
            setError(body);
          } catch {
            setError("Invalid token");
          }
        } else {
          setError(`Unknown error (code ${response.status})`);
        }
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchGuildsCommand, error, loading, data };
}