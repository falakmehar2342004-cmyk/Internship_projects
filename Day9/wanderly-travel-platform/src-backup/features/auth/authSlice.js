import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },

    authSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.error = null;
    },

    authFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;