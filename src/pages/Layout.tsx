import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { useAuthContext } from "../context";

export const Layout = () => {
  const { isAuthenticated, isAuthError, apiKey } = useAuthContext();

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("isAuthError: ", isAuthError);

  if (!apiKey || isAuthError) {
    return <LoginPage />;
  }

  return <MainPage />;
};
