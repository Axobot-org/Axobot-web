import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    id: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;