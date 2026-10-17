
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import authReducer from "../features/auth/authSlice.js";

// Browser localStorage adapter
const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);
