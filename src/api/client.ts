// src/api/client.js
import axios, { AxiosError } from "axios";

const API_BASE_URL = "";
const AUTH_HEADER_NAME = import.meta.env.VITE_AUTH_HEADER_NAME || "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Get API key from localStorage
export const getApiKey = () => localStorage.getItem(AUTH_HEADER_NAME);

// Set API key
export const setApiKey = (key: string) =>
  localStorage.setItem(AUTH_HEADER_NAME, key);

// Clear API key
export const clearApiKey = () => localStorage.removeItem(AUTH_HEADER_NAME);

// Add interceptor to attach API key to every request
apiClient.interceptors.request.use((config) => {
  const apiKey = getApiKey();
  if (apiKey) {
    config.headers[AUTH_HEADER_NAME] = apiKey;
  }
  return config;
});

// Check if error is auth-related
export const checkIsAuthError = (error: unknown) => {
  return (
    error instanceof AxiosError &&
    (error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.data?.message?.error === "token disabled" ||
      error.response?.data?.message?.error === "token expired")
  );
};
