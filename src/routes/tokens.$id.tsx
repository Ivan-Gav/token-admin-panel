import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { TokenPage } from "../pages/TokenPage";
import { checkIsAuthError } from "../api";
import { tokenQueryOptions } from "@/utils/queryOptions";

export const Route = createFileRoute("/tokens/$id")({
  component: TokenPage,
  beforeLoad: ({ context }) => {
    const {
      queryClient,
      auth: { apiKey },
    } = context;

    if (!apiKey) {
      queryClient.clear();
      throw redirect({
        to: "/login",
      });
    }
  },
  loader: async ({ context, params: { id } }) => {
    const {
      queryClient,
      auth: { setIsAuthError, setApiKey },
    } = context;

    try {
      const data = await queryClient.ensureQueryData(tokenQueryOptions(id));
      return data;
    } catch (error) {
      if (checkIsAuthError(error)) {
        console.log(`auth error`);
        setApiKey("");
        setIsAuthError(true);
        queryClient.clear();
        throw redirect({
          to: "/login",
        });
      }

      console.log("error: ", error);
      throw notFound();
    }
  },
});
