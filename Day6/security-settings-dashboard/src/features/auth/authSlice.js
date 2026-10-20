import { createSlice } from '@reduxjs/toolkit';

// Supabase session ka current state Redux mein rakhte hain.
// Actual session aur token Supabase manage karta hai.
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    // Login, signup ya restored session ke baad auth state update hoti hai.
    setAuthState(state, action) {
      const { user, session, initialized = true } = action.payload;

      state.user = user || null;
      state.accessToken = session?.access_token || null;
      state.refreshToken = session?.refresh_token || null;

      // User tab authenticated hoga jab valid session aur user dono hon.
      state.isAuthenticated = Boolean(session?.user && user);
      state.initialized = initialized;
      state.loading = false;
      state.error = null;
    },

    // Form submission ke waqt loader show karne ke liye.
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },

    // Common auth error ko Redux mein store karte hain.
    setAuthError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Purana error clear karne ke liye.
    clearAuthError(state) {
      state.error = null;
    },

    // Supabase sign-out ke baad Redux state clear hoti hai.
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.initialized = true;
    },
  },
});

export const {
  setAuthState,
  setAuthLoading,
  setAuthError,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;