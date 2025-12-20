import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "../router";
import { Layout } from "@/pages/Layout";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
