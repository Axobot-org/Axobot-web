import { useEffect } from "react";

import { useFetchLeaderboard } from "../api/useFetchLeaderboard";
import { useAppDispatch } from "../redux/hooks";
import useLeaderboardSelector from "../redux/selectors/useLeaderboardSelector";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { PLAYERS_PER_PAGE, setLeaderboard } from "../redux/slices/leaderboardSlice";

export function useGetLeaderboard(guildId: "global" | string, page: number) {
  const { fetchLeaderboardCommand, data, error, loading } = useFetchLeaderboard(guildId, page, PLAYERS_PER_PAGE);
  const token = useTokenSelector();
  const leaderboard = useLeaderboardSelector(guildId, page);
  const dispatch = useAppDispatch();

  const isTokenValid = guildId === "global" || token !== null;

  useEffect(() => {
    if (leaderboard === null && data === null && isTokenValid && !loading && !error) {
      fetchLeaderboardCommand();
    }
  }, [data, error, fetchLeaderboardCommand, leaderboard, loading, isTokenValid]);

  useEffect(() => {
    if (data !== null && error === null && !loading) {
      dispatch(setLeaderboard({ guildId, page, data: data }));
      console.debug("Dispatched leaderboard");
    }
  }, [data, dispatch, error, guildId, loading, page]);

  return { leaderboard, error, loading };
}