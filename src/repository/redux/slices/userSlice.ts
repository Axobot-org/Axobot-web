import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTokenFromStorage } from "../middlewares/localStorageMiddleware";

export interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: getTokenFromStorage(),
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    setToken: (state, action: PayloadAction<UserState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { logout, setToken } = userSlice.actions;

export default userSlice.reducer;