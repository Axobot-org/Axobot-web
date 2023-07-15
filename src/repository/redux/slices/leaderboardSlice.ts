import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RankedPlayer } from "../../types/users";

export type LeaderboardState = {
  [key: "global" | string]: {
    [key: string]: RankedPlayer
  },
}

export const PLAYERS_PER_PAGE = 30;

const initialState: LeaderboardState = {};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<{ guildId: "global" | string, page: number, data: RankedPlayer[] }>) => {
      const { guildId, data } = action.payload;
      if (state[guildId] === undefined) {
        state[guildId] = {};
      }
      data.forEach(player => {
        state[guildId][player.ranking] = player;
      });
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;