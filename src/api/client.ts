// src/api/client.js
import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Get API key from localStorage
export const getApiKey = () => localStorage.getItem("x-api-key");

// Set API key
export const setApiKey = (key: string) =>
  localStorage.setItem("x-api-key", key);

// Clear API key
export const clearApiKey = () => localStorage.removeItem("x-api-key");

// Add interceptor to attach API key to every request
apiClient.interceptors.request.use((config) => {
  const apiKey = getApiKey();
  if (apiKey) {
    console.log("apiKey intercepted in axios: ", apiKey);
    config.headers["x-api-key"] = apiKey;
  }
  return config;
});

// Check if error is auth-related
export const checkIsAuthError = (error: unknown) => {
  console.log("checking error: ", error);
  console.log("error instanceof AxiosError: ", error instanceof AxiosError);
  console.log(
    "error.response.status: ",
    (error as AxiosError)?.response?.status
  );

  return (
    error instanceof AxiosError &&
    (error.response?.status === 401 || error.response?.status === 403)
  );
};
