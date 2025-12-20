// src/components/MainPage.jsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { checkIsAuthError } from "@/api";
import { useEffect } from "react";
import { useAuthContext } from "@/context";
import { useInView } from "react-intersection-observer";
import { TokenItem } from "@/components/TokenItem";
import { useNavigate } from "@tanstack/react-router";
import { tokensQueryOptions } from "@/utils";
import { Loading } from "@/components/ui/Loading";

export const TokensPage = () => {
  const { setIsAuthError, setApiKey } = useAuthContext();

  const {
    status,
    data,
    error,
    // isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(tokensQueryOptions);

  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    if (!error) {
      return;
    }
    console.log("error: ", error);
    if (checkIsAuthError(error)) {
      setIsAuthError(true); // This will trigger showing login page
      setApiKey("");
      navigate({ to: "/login" });
    }
  }, [error, setIsAuthError, setApiKey, navigate]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error && !checkIsAuthError(error)) {
    console.log("auth error");
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
    <div className="flex flex-col gap-4 items-center w-full">
      {allTokens.map((item) => (
        <TokenItem item={item} key={item.id} />
      ))}

      {/* Триггер для загрузки следующей страницы */}
      <div ref={ref} className="loader-trigger">
        {isFetchingNextPage ? (
          <Loading />
        ) : (
          !hasNextPage && <div>Все токены загружены</div>
        )}
      </div>
    </div>
  );
};
