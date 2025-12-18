// src/components/MainPage.jsx
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiClient, checkIsAuthError, api } from "../api";
import { Fragment, useEffect } from "react";
import { TokenList } from "../components";
import { useAuthContext } from "../context";
import { useInView } from "react-intersection-observer";
import type { Token, TokenListResponse } from "../types";
import { TokenItem } from "../components/TokenItem";

const LIMIT = 5;

export const MainPage = () => {
  const { setIsAuthError } = useAuthContext();

  // const { isLoading, error } = useQuery({
  //   queryKey: ["content"],
  //   queryFn: () => apiClient.get(api.getTokenList).then((res) => res.data),
  //   retry: false,
  // });

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
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get(api.getTokenList, {
        params: {
          limit: LIMIT,
          offset: pageParam,
        },
      });

      console.log(`for pageParam=${pageParam} got response: `, response);

      return response.data;
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      console.log("lastPage: ", lastPage);

      if (lastPage?.data?.tokens?.length < LIMIT) {
        return null;
      }

      return lastPage.data.params.Offset + LIMIT;
    },
  });

  useEffect(() => {
    if (!error) {
      return;
    }
    if (checkIsAuthError(error)) {
      setIsAuthError(true); // This will trigger showing login page
    }
  }, [error, setIsAuthError]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  // if (!data) {
  //   return <div className="p-8">Loading content...</div>;
  // }

  if (error && !checkIsAuthError(error)) {
    return <div className="p-8 text-red-600">Error: {error.message}</div>;
  }

  if (status === "pending") {
    return <div>Загрузка...</div>;
  }

  if (status === "error") {
    return <div>Ошибка: {error.message}</div>;
  }

  // Получаем все токены из всех страниц
  const allTokens = data.pages.flatMap((page) => page.data.tokens);

  return (
    <div className="flex flex-col">
      {allTokens.map((item, index) => (
        <TokenItem item={item} key={item.id} />
      ))}

      {/* Триггер для загрузки следующей страницы */}
      <div ref={ref} className="loader-trigger">
        {isFetchingNextPage ? (
          <div>Загрузка...</div>
        ) : hasNextPage ? (
          <div>Достигнув этого элемента, начнется загрузка</div>
        ) : (
          <div>Все токены загружены</div>
        )}
      </div>

      {isFetching && !isFetchingNextPage && <div>Фоновая загрузка...</div>}
    </div>
  );
};
