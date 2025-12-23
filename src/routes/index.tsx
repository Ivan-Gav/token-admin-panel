import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { TokensPage } from "../pages";
import { tokensQueryOptions } from "@/utils/queryOptions";
import { checkIsAuthError } from "@/api";

export const Route = createFileRoute("/")({
  component: TokensPage,
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
  loader: async ({ context }) => {
    const {
      queryClient,
      auth: { setIsAuthError, setApiKey },
    } = context;

    // prefetch the first page
    try {
      return await queryClient.ensureInfiniteQueryData(tokensQueryOptions);
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
