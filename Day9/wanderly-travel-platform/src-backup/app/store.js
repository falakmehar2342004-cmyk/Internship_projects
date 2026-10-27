import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import locationReducer from "../features/location/locationSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    location: locationReducer,
    favorites: favoritesReducer,
  },
});