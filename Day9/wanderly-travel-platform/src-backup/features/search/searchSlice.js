import { createSlice } from "@reduxjs/toolkit";
import {
  getStorageItem,
  setStorageItem,
} from "../../utils/storage";
import {
  MAX_RECENT_SEARCHES,
  STORAGE_KEYS,
} from "../../utils/constants";

const initialState = {
  query: "",
  suggestions: [],
  recentSearches: getStorageItem(
    STORAGE_KEYS.recentSearches,
    []
  ),
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setSuggestions(state, action) {
      state.suggestions = action.payload;
    },

    clearSuggestions(state) {
      state.suggestions = [];
    },

    searchStart(state) {
      state.loading = true;
      state.error = null;
    },

    searchSuccess(state) {
      state.loading = false;
      state.error = null;
    },

    searchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addRecentSearch(state, action) {
      const value = action.payload.trim();

      if (!value) return;

      state.recentSearches = [
        value,
        ...state.recentSearches.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        ),
      ].slice(0, MAX_RECENT_SEARCHES);

      setStorageItem(
        STORAGE_KEYS.recentSearches,
        state.recentSearches
      );
    },

    clearRecentSearches(state) {
      state.recentSearches = [];
      setStorageItem(STORAGE_KEYS.recentSearches, []);
    },

    clearSearchError(state) {
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setSuggestions,
  clearSuggestions,
  searchStart,
  searchSuccess,
  searchFailure,
  addRecentSearch,
  clearRecentSearches,
  clearSearchError,
} = searchSlice.actions;

export default searchSlice.reducer;