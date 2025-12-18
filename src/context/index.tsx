import { createContext, useContext, useState, type ReactNode } from "react";
import { getApiKey, setApiKey as setKey } from "../api";

type AuthContextType = {
  apiKey: string;
  isAuthenticated: boolean;
  isAuthError: boolean;
  setApiKey: (key: string) => void;
  setIsAuthError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [apiKey, setApiKeyState] = useState(() => getApiKey() || "");

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    setKey(key);
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

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
