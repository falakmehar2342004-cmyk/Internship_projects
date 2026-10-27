import { createSlice } from "@reduxjs/toolkit";

// API errors ka ek centralized place.
const apiErrorSlice = createSlice({
  name: "apiError",
  initialState: {
    message: null,
  },
  reducers: {
    setApiError: (state, action) => {
      state.message = action.payload;
    },
    clearApiError: (state) => {
      state.message = null;
    },
  },
});

export const { setApiError, clearApiError } = apiErrorSlice.actions;
export default apiErrorSlice.reducer;