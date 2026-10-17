
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  apiError: null,

  dashboardUser: null,
  dashboardLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.apiError = null;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.apiError = null;
    },

    loginFailure: (state, action) => {
      state.isLoading = false;
      state.apiError = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.apiError = null;
      state.dashboardUser = null;
      state.dashboardLoading = false;
    },

    clearApiError: (state) => {
      state.apiError = null;
    },

    dashboardStart: (state) => {
      state.dashboardLoading = true;
      state.apiError = null;
    },

    dashboardSuccess: (state, action) => {
      state.dashboardLoading = false;
      state.dashboardUser = action.payload;
      state.apiError = null;
    },

    dashboardFailure: (state, action) => {
      state.dashboardLoading = false;
      state.apiError = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearApiError,
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
} = authSlice.actions;

export default authSlice.reducer;
