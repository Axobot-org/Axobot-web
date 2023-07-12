import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const userSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user,
);

export default function useUserSelector() {
  return useSelector(userSelector);
}