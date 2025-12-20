import { useState, type ReactNode } from "react";
import { getApiKey, setApiKey as setKey, clearApiKey } from "../api";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [apiKey, setApiKeyState] = useState(() => getApiKey() || "");

  const setApiKey = (key: string) => {
    if (key) {
      setApiKeyState(key);
      setKey(key);
    } else {
      setApiKeyState("");
      clearApiKey();
    }
  };

  const value = {
    apiKey,
    isAuthenticated,
    isAuthError,
    setApiKey,
    setIsAuthError,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
