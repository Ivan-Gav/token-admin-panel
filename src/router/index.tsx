import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";

import { useAuthContext, type AuthContextType } from "../context";

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
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    queryClient: undefined!,
  },
  defaultPendingComponent: () => <div>{"Зогрузко...."}</div>,
});

export const Router = () => {
  const auth = useAuthContext();
  const queryClient = useQueryClient();
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};
