import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setToken } from "../slices/userSlice";

const localStorageMiddleware = createListenerMiddleware();

// register token
localStorageMiddleware.startListening({
  actionCreator: setToken,
  effect: (action, listenerApi) => {
    console.log("localStorageMiddleware", action.payload);
    localStorage.setItem(
      "token",
      JSON.stringify(action.payload),
    );
  },
});

export function getTokenFromStorage(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
  return null;
}

export default localStorageMiddleware;