import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { LeaderboardState } from "../slices/leaderboardSlice";
import { RootState } from "../store";

type GuildLeaderboard = LeaderboardState[0];

const leaderboardStateSelector = createSelector(
  (state: RootState) => state.leaderboard,
  (leaderboard) => leaderboard,
);

const leaderboardSelector = createSelector(
  [leaderboardStateSelector, (_, guildId: "global" | string) => guildId],
  (state, guildId): GuildLeaderboard | null => state[guildId] ?? null,
);

export default function useLeaderboardSelector(guildId: "global" | string) {
  return useAppSelector(state => leaderboardSelector(state, guildId));
}