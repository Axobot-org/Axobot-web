import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTokenFromStorage } from "./localStorageMiddleware";

export interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: getTokenFromStorage(),
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    setToken: (state, action: PayloadAction<TokenState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { logout, setToken } = tokenSlice.actions;

export default tokenSlice.reducer;