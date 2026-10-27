import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchFlights } from "../../services/flightService";
import { setApiError } from "../api/apiErrorSlice";

// Storage read ko safe rakha gaya hai.
function readStorage(storage, key, fallback) {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getInitialState() {
  const session = readStorage(sessionStorage, "flight-dashboard-session", {});
  const localHistory = readStorage(localStorage, "flight-search-history", []);
  const savedFlights = readStorage(localStorage, "flight-saved-items", []);
  const recentlyViewed = readStorage(localStorage, "flight-recently-viewed", []);

  return {
    results: Array.isArray(session.results) ? session.results : [],
    status: "idle",
    filters: session.filters || { airlines: [], maxPrice: 500000 },
    sortBy: session.sortBy || "price-low",
    page: 1,
    pageSize: 6,
    lastSearch: session.lastSearch || null,
    searchHistory: Array.isArray(localHistory) ? localHistory : [],
    savedFlights: Array.isArray(savedFlights) ? savedFlights : [],
    recentlyViewed: Array.isArray(recentlyViewed) ? recentlyViewed : [],
  };
}

// Redux async thunk: request, loading state aur results ko coordinate karta hai.
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (searchParams, { dispatch, rejectWithValue }) => {
    try {
      const response = await searchFlights(searchParams);
      return { response, searchParams };
    } catch (error) {
      const message =
        error?.message ||
        "Flight search complete nahi ho saki. Dobara try karo.";

      dispatch(setApiError(message));
      return rejectWithValue(message);
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState: getInitialState(),
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    toggleAirline: (state, action) => {
      const airline = action.payload;
      const selected = state.filters.airlines;

      state.filters.airlines = selected.includes(airline)
        ? selected.filter((item) => item !== airline)
        : [...selected, airline];

      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addSearchHistory: (state, action) => {
      // Same search ko duplicate entry banane ke bajaye top par le aate hain.
      const search = action.payload;
      const signature = `${search.departure}-${search.destination}-${search.outboundDate}`;

      state.searchHistory = [
        search,
        ...state.searchHistory.filter(
          (item) =>
            `${item.departure}-${item.destination}-${item.outboundDate}` !==
            signature
        ),
      ].slice(0, 10);
    },
    toggleSavedFlight: (state, action) => {
      const flight = action.payload;
      const exists = state.savedFlights.some((item) => item.id === flight.id);

      state.savedFlights = exists
        ? state.savedFlights.filter((item) => item.id !== flight.id)
        : [flight, ...state.savedFlights];
    },
    addRecentlyViewed: (state, action) => {
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter((item) => item.id !== action.payload.id),
      ].slice(0, 10);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";

        const response = action.payload.response;
        state.results = Array.isArray(response?.flights)
          ? response.flights
          : [];

        state.lastSearch = action.payload.searchParams;
        state.page = 1;
        state.filters.airlines = [];
        state.filters.maxPrice = 500000;
      })
      .addCase(fetchFlights.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setFilters,
  toggleAirline,
  setSortBy,
  setPage,
  addSearchHistory,
  toggleSavedFlight,
  addRecentlyViewed,
} = flightSlice.actions;

export default flightSlice.reducer;