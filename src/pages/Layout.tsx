import type { PropsWithChildren } from "react";
import { LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { useAuthContext } from "../context";
import { Button } from "@/components/ui/Button";
import GostLogo from "../assets/icon.svg?react";
import { Link } from "@tanstack/react-router";

export const Layout = ({ children }: PropsWithChildren) => {
  const { isAuthError, apiKey, setApiKey, setIsAuthError, setIsAuthenticated } =
    useAuthContext();

  const showLogout = !!apiKey && !isAuthError;

  const handleLogout = () => {
    setApiKey("");
    setIsAuthError(false);
    setIsAuthenticated(false);
  };

  return (
    <>
      <header className="w-full flex h-20 p-8 border-b items-center justify-between gap-8 sticky top-0 ">
        <GostLogo className="h-12 w-12 scale-100" />
        <div className="flex justify-end-safe items-center gap-4">
          {!!showLogout && (
            <Link to={"/login"} onClick={handleLogout}>
              <Button variant="outline" size="icon">
                <LogOut className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
                <span className="sr-only">LogOut</span>
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </header>
      <main className="w-full min-h-[calc(100vh-5rem)] p-8 flex flex-col">
        <section className="w-full flex flex-col grow justify-center-safe items-center-safe">
          {children}
        </section>
      </main>
    </>
  );
};
