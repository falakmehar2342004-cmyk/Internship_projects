import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flights/flightSlice";
import apiErrorReducer from "../features/api/apiErrorSlice";

// Redux store app ki shared state manage karta hai.
export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    apiError: apiErrorReducer,
  },
});