
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getFavorites,
  saveFavorite,
  deleteFavorite,
} from "../../services/favoritesService";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      return await getFavorites();
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not load favorites."
      );
    }
  }
);

export const addFavoriteAsync = createAsyncThunk(
  "favorites/addFavorite",
  async (destination, { rejectWithValue }) => {
    try {
      return await saveFavorite(destination);
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not save this favorite."
      );
    }
  }
);

export const removeFavoriteAsync = createAsyncThunk(
  "favorites/removeFavorite",
  async (destinationId, { rejectWithValue }) => {
    try {
      return await deleteFavorite(destinationId);
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not remove this favorite."
      );
    }
  }
);

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
        (item) => String(item.id) === String(destination.id)
      );

      if (exists) {
        state.items = state.items.map((item) =>
          String(item.id) === String(destination.id)
            ? { ...item, ...destination }
            : item
        );
      } else {
        state.items.push(destination);
      }
    },

    removeFavorite(state, action) {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
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

  extraReducers: (builder) => {
    builder
      // Fetch all saved favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Could not load favorites.";
      })

      // Save or update a favorite
      .addCase(addFavoriteAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        const saved = action.payload;

        const exists = state.items.some(
          (item) => String(item.id) === String(saved.id)
        );

        if (exists) {
          state.items = state.items.map((item) =>
            String(item.id) === String(saved.id)
              ? { ...item, ...saved }
              : item
          );
        } else {
          state.items.push(saved);
        }
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.error =
          action.payload || "Could not save this favorite.";
      })

      // Remove a favorite
      .addCase(removeFavoriteAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => String(item.id) !== String(action.payload)
        );
      })
      .addCase(removeFavoriteAsync.rejected, (state, action) => {
        state.error =
          action.payload || "Could not remove this favorite.";
      });
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
