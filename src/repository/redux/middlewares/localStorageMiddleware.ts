import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { logout, setToken } from "../slices/userSlice";
import { AppStartListening } from "../store";

const localStorageMiddleware = createListenerMiddleware();

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

export function getTokenFromStorage(): string | null {
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

export default localStorageMiddleware;