import axios from "axios";
import { store } from "../app/store";

const apiKey = import.meta.env.VITE_REQRES_API_KEY;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    ...(apiKey ? { "x-api-key": apiKey } : {}),
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    const isLoginOrRegister =
      /\/(login|register)\/?$/.test(url);

    if (status === 401 && !isLoginOrRegister) {
      store.dispatch({ type: "auth/logout" });

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    return Promise.reject({
      message,
      status: status || null,
    });
  }
);

export default api;