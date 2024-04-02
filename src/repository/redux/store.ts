import { configureStore, TypedStartListening } from "@reduxjs/toolkit";

import { axoApi } from "./api";
import localStorageMiddleware from "./middlewares/localStorageMiddleware";
import userReducer from "./slices/userSlice";

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