// Application entry point:
// Redux Provider shared state deta hai, aur Toaster notifications show karta hai.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { store } from './app/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{ className: 'app-toast' }}
      />
    </Provider>
  </StrictMode>
);