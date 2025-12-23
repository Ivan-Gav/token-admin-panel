import { apiClient, api } from "@/api";
import { infiniteQueryOptions } from "@tanstack/react-query";

const LIMIT = 1;

export const tokensQueryOptions = infiniteQueryOptions({
  queryKey: ["tokens"],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await apiClient.get(api.getTokenList, {
      params: {
        limit: LIMIT,
        offset: pageParam,
      },
    });
    return response.data;
  },

  initialPageParam: 0,

  getNextPageParam: (lastPage) => {
    if (!lastPage?.data?.tokens || !Array.isArray(lastPage.data.tokens)) {
      return null;
    }

    if (
      lastPage.data.tokens.length === 0 ||
      lastPage.data.tokens.length < LIMIT
    ) {
      return null;
    }

    return lastPage.data.params.offset + LIMIT;
  },
});
