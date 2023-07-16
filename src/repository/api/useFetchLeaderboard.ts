import { useState } from "react";

import useTokenSelector from "../redux/selectors/useTokenSelector";
import { RankedPlayer } from "../types/users";

interface ApiResponse {
  guild: null,
  players: RankedPlayer[],
}

export function useFetchLeaderboard(guildId: "global" | string, page: number, limit: number) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RankedPlayer[] | null>(null);

  const token = useTokenSelector();

  async function fetchLeaderboardCommand() {
    setLoading(true);
    if (guildId !== "global" && token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const URL = guildId === "global"
      ? process.env.REACT_APP_API_URL + "/discord/leaderboard/global"
      : process.env.REACT_APP_API_URL + "/discord/guilds/" + guildId + "/leaderboard";

    const urlParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const headers = token === null
      ? undefined
      : { "Authorization": token };

    try {
      const response = await fetch(
        URL + "?" + urlParams,
        {
          method: "GET",
          headers: headers,
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json["players"]);
      } else if (response.status === 401) {
        setError("Invalid token");
      } else if (response.status === 404) {
        setError("Guild not found");
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

  return { fetchLeaderboardCommand, error, loading, data };
}