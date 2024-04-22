import { createListenerMiddleware, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { AppStartListening } from "../store";

function getTokenFromStorage(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return JSON.parse(token);
    } catch (e) {
      console.error(e);
      localStorage.removeItem("token");
    }
  }
  return null;
}

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

export const localStorageMiddleware = createListenerMiddleware();

const startAppListening = localStorageMiddleware.startListening as AppStartListening;

// register token
startAppListening({
  matcher: isAnyOf(setToken, logout),
  effect: (action, listenerApi) => {
    const token = listenerApi.getState().user.token;
    if (token === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", JSON.stringify(token));
    }
  },
});

export default tokenSlice.reducer;