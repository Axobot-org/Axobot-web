import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";


const guildStateSelector = createSelector(
  (state: RootState) => state.guild,
  (guild) => guild,
)

export default function useGuildSelector() {
  return useAppSelector(state => guildStateSelector(state));
}