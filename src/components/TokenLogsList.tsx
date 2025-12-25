import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { TokenLogsItem } from "./TokenLogsItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/Pagination";
import { DateRangePicker } from "./DateRangePicker";
import { Loading } from "./ui/Loading";
import { Button } from "./ui/Button";
import { api, apiClient } from "@/api";
import type { Response, TokenLogItem } from "@/types";
import { LimitInput } from "./LimitInput";
import { EmptyLogs } from "./EmptyLogs";

const DEFAULT_LIMIT = 20;

type Props = {
  id: string;
};

export const TokenLogsList = ({ id }: Props) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [page, setPage] = useState(0);
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["items", limit, page, start, end],
    queryFn: async () => {
      const requestBody = !!(start && end)
        ? JSON.stringify({
            last: {
              limit: limit + 1, // Fetch one extra to check for "hasMore"
              skip: page * limit,
            },
            period: {
              start,
              end,
            },
            token_id: id,
          })
        : JSON.stringify({
            last: {
              limit: limit + 1, // Fetch one extra to check for "hasMore"
              skip: page * limit,
            },
            token_id: id,
          });

      const response = await apiClient.post<Response<TokenLogItem[]>>(
        api.fetchTokenLogs,
        requestBody
      );

      return response.data.data || [];
    },
    placeholderData: keepPreviousData,
  });

  const hasNextPage = data && data.length > limit;
  const displayData = hasNextPage ? data.slice(0, limit) : data;

  return (
    <div className="p-4">
      <div className="flex flex-row justify-end-safe items-stretch gap-4 pb-4 overflow-hidden">
        <LimitInput limit={limit} setLimit={setLimit} />
        <DateRangePicker
          from={start}
          to={end}
          onUpdate={(f, t) => {
            setPage(0);
            setStart(f);
            setEnd(t);
          }}
        />
      </div>
      <hr />

      <div>
        {isLoading ? (
          <Loading />
        ) : !!displayData?.length ? (
          <ul className="divide-y list-none">
            {displayData?.map((item) => (
              <TokenLogsItem key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <EmptyLogs />
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          <span className="text-sm self-center">{page + 1}</span>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={!hasNextPage || isPlaceholderData}
              onClick={() => setPage((p) => p + 1)}
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
