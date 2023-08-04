import { useEffect } from "react";

import { useFetchLeaderboard } from "../api/useFetchLeaderboard";
import { useAppDispatch } from "../redux/hooks";
import useLeaderboardSelector from "../redux/selectors/useLeaderboardSelector";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { PLAYERS_PER_PAGE, setLeaderboard } from "../redux/slices/leaderboardSlice";

export function useGetLeaderboard(guildId: "global" | string) {
  const { fetchLeaderboardCommand, data, error, loading } = useFetchLeaderboard(guildId);
  const token = useTokenSelector();
  const leaderboard = useLeaderboardSelector(guildId);
  const dispatch = useAppDispatch();

  const isTokenValid = guildId === "global" || token !== null;

  useEffect(() => {
    if (data !== null && data.players.length > 0 && error === null && !loading) {
      const page = Math.floor(data.players[0].ranking / PLAYERS_PER_PAGE);
      dispatch(setLeaderboard({
        guildId,
        guildData: data.guild,
        players: data.players,
        totalCount: data.players_count,
        xpType: data.xp_type,
      }));
      console.debug("Dispatched leaderboard for page " + page);
    }
  }, [data, dispatch, error, guildId, loading]);

  function fetchLeaderboardPage(page: number) {
    if (isTokenValid) {
      fetchLeaderboardCommand(page, PLAYERS_PER_PAGE);
    }
  }

  return { fetchLeaderboardPage, leaderboard, error, loading };
}