import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { TokenPage } from "../pages/TokenPage";
import { queryOptions } from "@tanstack/react-query";
import { api, apiClient, checkIsAuthError } from "../api";
import type { Response, Token } from "../types";

const tokenQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["token", id],
    queryFn: () =>
      apiClient.get<Response<Token>>(`${api.getToken}?token_id=${id}`),
  });

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
    console.log("start fetching");
    // await new Promise((r) => setTimeout(r, 2000));
    const {
      queryClient,
      auth: { setIsAuthError, setApiKey },
    } = context;

    try {
      const data = await queryClient.ensureQueryData(tokenQueryOptions(id));
      return data.data;
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
  // pendingComponent: () => <div>{"Зогрузко токена...."}</div>,
});
