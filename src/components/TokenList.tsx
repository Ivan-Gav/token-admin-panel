import { useInView } from "react-intersection-observer";
import { TokenItem } from "./TokenItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api, apiClient } from "../api";
import type { Token } from "../types";
import { Fragment, useEffect } from "react";

//-----------------------------------------------------------

export const TokenList = () => {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["tokens"],
    queryFn: async ({
      pageParam,
    }): Promise<{
      data: Array<Token>;
      previousId: number;
      nextId: number;
    }> => {
      return await apiClient.get(api.getTokenList, {
        params: {
          limit: 5,
          offset: pageParam * 5,
        },
      });
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                  ? "Load Older"
                  : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => (
            <Fragment key={page.nextId}>
              {page.data.map((item) => (
                <TokenItem item={item} key={item.id} />
              ))}
            </Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load Newer"
                  : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
};
