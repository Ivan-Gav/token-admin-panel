import type { PropsWithChildren } from "react";
import { LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { useAuthContext } from "@/context";
import { Button } from "@/components/ui/Button";
import GostLogo from "@/assets/icon.svg?react";
import { Link, useLocation } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import PlusIcon from "@/assets/plus.svg?react";
import ListIcon from "@/assets/list.svg?react";
import { ModalProvider } from "@/components/modals/ModalProvider";

// ----------------------------------------------------------------------

const CreateTokenButton = () => {
  const { pathname } = useLocation();

  if (pathname === "/token-create") {
    return null;
  }

  return (
    <Link to={"/token-create"}>
      <Button variant="ghost" className="gap-1 px-1">
        <PlusIcon className="size-6" />
        <span>{"Создать токен"}</span>
      </Button>
    </Link>
  );
};

// ----------------------------------------------------------------------

const LogoutButton = () => {
  const { setApiKey, setIsAuthError, setIsAuthenticated } = useAuthContext();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    setApiKey("");
    setIsAuthError(false);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  return (
    <Link to={"/login"} onClick={handleLogout}>
      <Button variant="outline" size="icon">
        <LogOut className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">LogOut</span>
      </Button>
    </Link>
  );
};

// ----------------------------------------------------------------------

const BackToListButton = () => {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/login") {
    return null;
  }

  return (
    <Link to={"/"}>
      <Button variant="ghost" className="gap-1 px-1">
        <ListIcon className="size-6" />
        <span>{"К списку токенов"}</span>
      </Button>
    </Link>
  );
};

// ----------------------------------------------------------------------

export const Layout = ({ children }: PropsWithChildren) => {
  const { isAuthError, apiKey } = useAuthContext();

  const isAuthorized = !!apiKey && !isAuthError;

  return (
    <>
      <header className="w-full flex h-20 p-8 border-b items-center justify-between gap-8 sticky top-0 bg-background z-10">
        <GostLogo className="h-12 w-12 scale-100 hidden sm:block" />
        <nav className="flex justify-end-safe items-center gap-4 ml-auto">
          {!!isAuthorized && (
            <>
              <BackToListButton />
              <CreateTokenButton />
              <LogoutButton />
            </>
          )}
          <ThemeToggle />
        </nav>
      </header>
      <main className="w-full min-h-[calc(100vh-5rem)] p-8 flex flex-col">
        <section className="w-full flex flex-col grow justify-center-safe items-center-safe">
          {children}
        </section>
      </main>
      <ModalProvider />
    </>
  );
};
