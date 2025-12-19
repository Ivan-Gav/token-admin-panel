// src/components/MainPage.jsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient, checkIsAuthError, api } from "../api";
import { useEffect } from "react";
import { useAuthContext } from "../context";
import { useInView } from "react-intersection-observer";
import { TokenItem } from "../components/TokenItem";

const LIMIT = 5;

export const MainPage = () => {
  const { setIsAuthError } = useAuthContext();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["tokens"],
    queryFn: async ({ pageParam }) => {
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

  if (error && !checkIsAuthError(error)) {
    return <div className="p-8 text-red-600">Error: {error.message}</div>;
  }

  if (status === "pending") {
    return <div>Загрузка...</div>;
  }

  if (status === "error") {
    return <div>Ошибка: {error.message}</div>;
  }

  const allTokens = data.pages
    .flatMap((page) => page.data.tokens)
    .filter((token) => !!token);

  return (
    <div className="flex flex-col">
      {allTokens.map((item) => (
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
