import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GuildData {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  splash: string | null;
  owner: boolean;
  isAdmin: boolean;
  permissions: string;
  features: string[];
}

export type GuildState = {
  [key: string]: GuildData
} | null;

const initialState = null as GuildState;

export const guildSlice = createSlice({
  name: "guild",
  initialState,
  reducers: {
    resetGuilds: () => {
      return initialState;
    },
    setGuild: (state, action: PayloadAction<{guildId: string, data: GuildData}>) => {
      if (state === null) {
        return {
          [action.payload.guildId]: action.payload.data,
        };
      }
      state[action.payload.guildId] = action.payload.data;
    },
    setGuilds: (state, action: PayloadAction<Exclude<GuildState, null>>) => {
      return action.payload;
    },
  }
})

export const { resetGuilds, setGuild, setGuilds } = guildSlice.actions;

export default guildSlice.reducer;