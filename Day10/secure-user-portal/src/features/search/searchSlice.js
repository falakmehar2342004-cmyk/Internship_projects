
import { createSlice } from '@reduxjs/toolkit';

function readStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    totalResults: null,
    recentSearches: readStorage('portal_recent_searches'),
    savedSearches: readStorage('portal_saved_searches'),
    loading: false,
    error: null,
    searchedAt: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    searchStarted(state) {
      state.loading = true;
      state.error = null;
    },

    searchSucceeded(state, action) {
      state.loading = false;
      state.error = null;
      state.query = action.payload.query;
      state.results = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.searchedAt = action.payload.searchedAt;

      const normalizedQuery = action.payload.query.toLowerCase();

      state.recentSearches = [
        action.payload.query,
        ...state.recentSearches.filter(
          (item) => item.toLowerCase() !== normalizedQuery
        ),
      ].slice(0, 10);

      try {
        localStorage.setItem(
          'portal_recent_searches',
          JSON.stringify(state.recentSearches)
        );
      } catch {
        // Storage unavailable ho to current search phir bhi work karegi.
      }
    },

    searchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearSearchError(state) {
      state.error = null;
    },

    toggleSavedSearch(state, action) {
      const query = action.payload;
      const exists = state.savedSearches.some(
        (item) => item.toLowerCase() === query.toLowerCase()
      );

      state.savedSearches = exists
        ? state.savedSearches.filter(
            (item) => item.toLowerCase() !== query.toLowerCase()
          )
        : [query, ...state.savedSearches];

      try {
        localStorage.setItem(
          'portal_saved_searches',
          JSON.stringify(state.savedSearches)
        );
      } catch {
        // Storage error UI ko crash nahi karega.
      }
    },

    clearRecentSearches(state) {
      state.recentSearches = [];

      try {
        localStorage.removeItem('portal_recent_searches');
      } catch {
        // Ignore storage errors.
      }
    },
  },
});

export const {
  setQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearSearchError,
  toggleSavedSearch,
  clearRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
