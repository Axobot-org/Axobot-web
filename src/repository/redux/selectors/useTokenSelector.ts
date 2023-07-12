import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const tokenSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.token,
);

export default function useTokenSelector() {
  return useSelector(tokenSelector);
}