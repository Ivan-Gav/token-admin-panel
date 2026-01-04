import type { PropsWithChildren } from "react";
import { LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { useAuthContext } from "@/context";
import { Button } from "@/components/ui/Button";
import Logo from "@/assets/token.svg?react";
import { Link, useLocation } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import PlusIcon from "@/assets/plus.svg?react";
import ListIcon from "@/assets/list.svg?react";
import AboutIcon from "@/assets/about.svg?react";
import GitHubIcon from "@/assets/github.svg?react";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { LABELS } from "@/constants";

// ----------------------------------------------------------------------

const AboutButton = () => {
  const { pathname } = useLocation();

  if (pathname === "/about") {
    return null;
  }

  return (
    <Link to={"/about"}>
      <Button variant="outline" className="sm:hidden" size="icon">
        <AboutIcon className="size-6" />
      </Button>
      <Button variant="ghost" className="hidden sm:flex gap-1 px-1">
        <AboutIcon className="size-6" />
        <span>{LABELS.about}</span>
      </Button>
    </Link>
  );
};

// ----------------------------------------------------------------------

const CreateTokenButton = () => {
  const { pathname } = useLocation();

  if (pathname === "/token-create") {
    return null;
  }

  return (
    <Link to={"/token-create"}>
      <Button variant="outline" className="sm:hidden" size="icon">
        <PlusIcon className="size-6" />
      </Button>
      <Button variant="ghost" className="hidden sm:flex gap-1 px-1">
        <PlusIcon className="size-6" />
        <span>{LABELS.createToken}</span>
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
        <span className="sr-only">{LABELS.logOut}</span>
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
      <Button variant="outline" className="sm:hidden" size="icon">
        <ListIcon className="size-6" />
      </Button>
      <Button variant="ghost" className="hidden sm:flex gap-1 px-1">
        <ListIcon className="size-6" />
        <span className="hidden sm:inline">{LABELS.tokenList}</span>
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
        <Link to="/">
          <Logo className="h-14 w-14 scale-100 hidden sm:block" />
        </Link>
        <nav className="flex justify-end-safe items-center gap-4 ml-auto">
          {!!isAuthorized && (
            <>
              <BackToListButton />
              <CreateTokenButton />
            </>
          )}

          <AboutButton />

          {!!isAuthorized && <LogoutButton />}

          <ThemeToggle />
        </nav>
      </header>
      <main className="w-full min-h-[calc(100vh-8rem)] p-8 flex flex-col grow">
        <section className="w-full h-full flex flex-col grow justify-center-safe items-center-safe">
          {children}
        </section>
      </main>
      <footer className="w-full flex h-12 px-8 border-t items-center justify-between gap-8">
        <div className="flex">
          <span>©&nbsp;2026&nbsp;</span>
          <a href="https://gavrilin.online/" target="_blank">
            Ivan Gavrilin
          </a>
        </div>
        <a href="https://github.com/Ivan-Gav/token-admin-panel" target="_blank">
          <GitHubIcon className="size-6" />
        </a>
      </footer>
      <ModalProvider />
    </>
  );
};
