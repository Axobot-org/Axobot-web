import { configureStore, TypedStartListening } from "@reduxjs/toolkit";

import localStorageMiddleware from "./middlewares/localStorageMiddleware";
import leaderboardReducer from "./slices/leaderboardSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export default store;