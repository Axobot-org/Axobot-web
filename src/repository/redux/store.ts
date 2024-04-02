import { configureStore, TypedStartListening } from "@reduxjs/toolkit";

import { axoApi } from "./api/api";
import localStorageMiddleware from "./tokenStorage/localStorageMiddleware";
import userReducer from "./tokenStorage/tokenSlice";

const store = configureStore({
  reducer: {
    [axoApi.reducerPath]: axoApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(localStorageMiddleware.middleware)
      .concat(axoApi.middleware)
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export default store;