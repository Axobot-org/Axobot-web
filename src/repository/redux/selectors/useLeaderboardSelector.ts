import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { LeaderboardState, PLAYERS_PER_PAGE } from "../slices/leaderboardSlice";
import { RootState } from "../store";

type GuildLeaderboard = LeaderboardState[0];

const leaderboardStateSelector = createSelector(
  (state: RootState) => state.leaderboard,
  (leaderboard) => leaderboard,
);

function getSliceFromGuildLeaderboard(guildObject: GuildLeaderboard | undefined, page: number) {
  if (guildObject === undefined) {
    return null;
  }
  const slice: GuildLeaderboard = {};
  for (let i = 0; i < PLAYERS_PER_PAGE; i++) {
    const index = i + page * PLAYERS_PER_PAGE;
    if (guildObject[index]) {
      slice[index] = guildObject[index];
    }
  }
  return slice;
}

const leaderboardSelector = createSelector(
  [leaderboardStateSelector, (_, guildId: "global" | string, page: number) => [guildId, page]],
  (state, [guildId, page]): GuildLeaderboard | null => getSliceFromGuildLeaderboard(state[guildId as string], page as number),
);

export default function useLeaderboardSelector(guildId: "global" | string, page: number) {
  return useAppSelector(state => leaderboardSelector(state, guildId, page));
}