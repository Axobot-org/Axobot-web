import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { GuildState } from "../slices/guildSlice";
import { RootState } from "../store";

type GuildData = Exclude<GuildState, null>[0];

const guildStateSelector = createSelector(
  (state: RootState) => state.guild,
  (guild) => guild,
)

const guildSelector = createSelector(
  [guildStateSelector, (_, guildId: string) => guildId],
  (state, guildId): GuildData | null => state === null ? null : (state[guildId] ?? null),
)

export default function useGuildSelector(guildId: string) {
  return useAppSelector(state => guildSelector(state, guildId));
}