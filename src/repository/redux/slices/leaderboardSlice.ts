import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RankedPlayer } from "../../types/users";

export type LeaderboardState = {
  [key: "global" | string]: {
    totalCount: number,
    players: {[key: string]: RankedPlayer}
  },
}

export const PLAYERS_PER_PAGE = 30;

const initialState: LeaderboardState = {};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<{ guildId: "global" | string, players: RankedPlayer[], totalCount: number }>) => {
      const { guildId, players, totalCount } = action.payload;
      if (state[guildId] === undefined) {
        state[guildId] = {
          totalCount: totalCount,
          players: {},
        };
      }
      players.forEach(player => {
        state[guildId].players[player.ranking] = player;
      });
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;