import axios from 'axios';
import { store } from '../app/store';

// Ye base URL future backend/API integration ke liye placeholder hai.
// Dashboard ki neeche wali functions abhi local mock data use karti hain.
export const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

// Har request par current Supabase access token attach karte hain.
// Supabase SDK apna session aur refresh flow khud manage karta hai.
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Local mock services: inhein filhal change karne ki zaroorat nahi.
export const getDevices = async () =>
  (await import('../data/mockData')).mockDevices;

export const getActivityLogs = async () =>
  (await import('../data/mockData')).mockActivityLogs;

export const getSecuritySettings = async () =>
  (await import('../data/mockData')).initialSecuritySettings;