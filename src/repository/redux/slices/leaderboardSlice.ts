import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RankedPlayer } from "../../types/users";

export interface LeaderboardGuildData {
  id: string;
  name: string;
  icon: string | null;
}

export type LeaderboardState = {
  [key: "global" | string]: {
    players: {[key: string]: RankedPlayer}
    guildData: LeaderboardGuildData | null,
    totalCount: number,
    xpType: string,
  },
}

export const PLAYERS_PER_PAGE = 30;

const initialState: LeaderboardState = {};

interface SetAction {
  guildId: "global" | string,
  guildData: LeaderboardGuildData | null,
  players: RankedPlayer[],
  totalCount: number
  xpType: string,
}

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<SetAction>) => {
      const { guildId, guildData, players, totalCount, xpType } = action.payload;
      if (state[guildId] === undefined) {
        // init new value in state
        state[guildId] = {
          guildData: guildData,
          players: {},
          totalCount: totalCount,
          xpType: xpType,
        };
      } else {
        // refresh existing value in state
        state[guildId].guildData = guildData;
        state[guildId].totalCount = totalCount;
        state[guildId].xpType = xpType;
      }
      // add/set players in guild state
      players.forEach(player => {
        state[guildId].players[player.ranking] = player;
      });
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;