import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import securityReducer from '../features/security/securitySlice';

// The store combines authentication/session state with dashboard security preferences.
export const store = configureStore({ reducer: { auth: authReducer, security: securityReducer } });
