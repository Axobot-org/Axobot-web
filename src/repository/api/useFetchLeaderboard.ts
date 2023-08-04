import { useState } from "react";

import useTokenSelector from "../redux/selectors/useTokenSelector";
import { RankedPlayer } from "../types/users";

interface ApiResponse {
  guild: {
    id: string;
    name: string;
    icon: string | null;
  } | null,
  players: RankedPlayer[],
  players_count: number,
  xp_type: string,
}

export function useFetchLeaderboard(guildId: "global" | string) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const token = useTokenSelector();

  async function fetchLeaderboardCommand(page: number, limit: number) {
    setLoading(true);
    if (guildId !== "global" && token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const URL = guildId === "global"
      ? process.env.REACT_APP_API_URL + "/discord/leaderboard/global"
      : process.env.REACT_APP_API_URL + "/discord/guild/" + guildId + "/leaderboard";

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
        setData(json);
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