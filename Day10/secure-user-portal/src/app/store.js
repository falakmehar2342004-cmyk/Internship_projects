// Redux store application ke shared state ko combine karta hai.

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import errorReducer from '../features/error/errorSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
     search: searchReducer,
  },
});