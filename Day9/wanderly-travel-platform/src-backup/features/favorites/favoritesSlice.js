import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
      state.error = null;
    },

    addFavorite(state, action) {
      const destination = action.payload;

      const exists = state.items.some(
        (item) => item.id === destination.id
      );

      if (!exists) {
        state.items.push(destination);
      }
    },

    removeFavorite(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    favoritesStart(state) {
      state.loading = true;
      state.error = null;
    },

    favoritesSuccess(state) {
      state.loading = false;
    },

    favoritesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearFavoritesError(state) {
      state.error = null;
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  favoritesStart,
  favoritesSuccess,
  favoritesFailure,
  clearFavoritesError,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;