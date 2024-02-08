import { useEffect } from "react";

import { useFetchLeaderboard } from "../api/useFetchLeaderboard";
import { useAppDispatch } from "../redux/hooks";
import useLeaderboardSelector from "../redux/selectors/useLeaderboardSelector";
import { PLAYERS_PER_PAGE, setLeaderboard } from "../redux/slices/leaderboardSlice";

export function useGetLeaderboard(guildId: "global" | string) {
  const { fetchLeaderboardCommand, data, error, loading } = useFetchLeaderboard(guildId);
  const leaderboard = useLeaderboardSelector(guildId);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (data !== null && data.players.length > 0 && error === null && !loading) {
      dispatch(setLeaderboard({
        guildId,
        guildData: data.guild,
        players: data.players,
        totalCount: data.players_count,
        xpType: data.xp_type,
      }));
    }
  }, [data, dispatch, error, guildId, loading]);

  function fetchLeaderboardPage(page: number) {
    fetchLeaderboardCommand(page, PLAYERS_PER_PAGE);
  }

  return { fetchLeaderboardPage, leaderboard, error, loading };
}