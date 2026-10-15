
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

// Request interceptor ya request bhejna sa pehla chlta or sath header add krta ha 
api.interceptors.request.use(
  (config) => {
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor response ana sa pehla run hota ha 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(
      Object.assign(new Error(message), {
        status: error.response?.status,
        code: error.code,
      })
    );
  }
);

// Reusable API error handler yaha sara common error message rkh leta bajae iska alag alag component mn error message likha
export const getApiErrorMessage = (error) => {
  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (!error.status) {
    return "Network error. Please check your connection.";
  }

  return error.message || "Failed to load data.";
};

export default api;
