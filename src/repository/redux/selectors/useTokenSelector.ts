import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const tokenSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.token,
);

export default function useTokenSelector() {
  return useAppSelector(tokenSelector);
}