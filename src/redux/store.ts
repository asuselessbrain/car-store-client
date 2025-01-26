import { configureStore } from "@reduxjs/toolkit";
import { allCarsApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    [allCarsApi.reducerPath]: allCarsApi.reducer,
  },

  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(allCarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
