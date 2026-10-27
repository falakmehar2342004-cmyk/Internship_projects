import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { store } from "./app/store";
import { ThemeProvider } from "./context/ThemeContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Application entry point: Redux, routing, theme aur notifications.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />

          {/* Har page se toast notifications show ho sakti hain. */}
          <ToastContainer
            position="top-right"
            autoClose={3500}
            theme="colored"
            newestOnTop
          />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
