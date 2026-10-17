
import api from "./api.js";

const reqresHeaders = {
  "x-api-key": import.meta.env.VITE_REQRES_API_KEY,
};

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/login",
    credentials,
    { headers: reqresHeaders }
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(
    "/register",
    userData,
    { headers: reqresHeaders }
  );

  return response.data;
};

