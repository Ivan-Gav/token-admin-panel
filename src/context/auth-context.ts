import { createContext, useContext } from "react";

export type AuthContextType = {
  apiKey: string;
  isAuthenticated: boolean;
  isAuthError: boolean;
  setApiKey: (key: string) => void;
  setIsAuthError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
