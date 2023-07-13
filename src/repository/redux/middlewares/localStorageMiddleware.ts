import { createListenerMiddleware } from "@reduxjs/toolkit";

import { login, setToken, UserState } from "../slices/userSlice";

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

// register user_id
localStorageMiddleware.startListening({
  actionCreator: login,
  effect: (action, listenerApi) => {
    console.log("localStorageMiddleware", action.payload);
    localStorage.setItem(
      "user",
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

export function getUserObjectFromStorage(): UserState["user"] | null {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export default localStorageMiddleware;