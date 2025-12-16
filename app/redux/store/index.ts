import { configureStore } from "@reduxjs/toolkit";

import cryptoToCashReducer from "../slices/crypto-to-cash/cryptoToCashSlice";

//Configure the store
export const store = configureStore({
  reducer: {
    cryptoToCash: cryptoToCashReducer,
  },
});

export default store;

//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
