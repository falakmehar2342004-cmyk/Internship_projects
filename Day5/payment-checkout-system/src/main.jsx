import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { store } from './app/store';
import App from './App';

// Yahan styles import ho rahi hain. Order important hai:
// pehle Tailwind, phir theme colours, phir global aur component styles.
import './styles/tailwind.css';
import './styles/theme.css';
import './styles/global.css';
import './styles/components.css';

// Yahan poori app ko 3 providers mein lapeta gaya hai:
// ThemeProvider (dark/light), Redux Provider (store), BrowserRouter (pages).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
