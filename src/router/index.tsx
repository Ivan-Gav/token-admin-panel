import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";

import { useAuthContext, type AuthContextType } from "../context";
import { Loading } from "@/components/ui/Loading";
import { NotFoundPage } from "@/pages";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface RouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  basepath: BASE_URL ? `${BASE_URL}` : "/",
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    queryClient: undefined!,
  },
  defaultPendingComponent: Loading,
  defaultNotFoundComponent: NotFoundPage,
});

export const Router = () => {
  const auth = useAuthContext();
  const queryClient = useQueryClient();
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};
