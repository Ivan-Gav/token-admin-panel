import { getRouteApi } from "@tanstack/react-router";

import EditIcon from "@/assets/edit.svg?react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CopyToClipboard } from "@/components/ui/CopyToClipboard";
import { format } from "date-fns";
import { IconButton } from "@/components/ui/IconButton";
import { useModalStore } from "@/store/useModalStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tokenQueryOptions } from "@/utils/queryOptions";
import { TokenLogs } from "@/components/TokenLogs";
import { LABELS } from "@/constants";

//---------------------------------------------------------

type PropertyLineProps = {
  title: string;
  value: string;
  onEditClick?: () => void;
};

//---------------------------------------------------------

const PropertyLine = ({ title, value, onEditClick }: PropertyLineProps) => {
  return (
    <div className="flex gap-2 w-full">
      <span className="font-semibold inline-block sm:min-w-60">{`${title}: `}</span>
      <span className="">{value}</span>
      {!!onEditClick && (
        <IconButton onClick={onEditClick} className="h-fit">
          <EditIcon />
        </IconButton>
      )}
    </div>
  );
};

//---------------------------------------------------------

const route = getRouteApi("/tokens/$id");

export const TokenPage = () => {
  const { id: tokenId } = route.useParams();

  const data = useSuspenseQuery(tokenQueryOptions(tokenId));

  const onOpen = useModalStore((s) => s.onOpen);

  const {
    id,
    active_before: activeBefore,
    created_at: createdAt,
    comment,
    has_private_access: hasPrivateAccess,
    is_active: isActive,
    owner,
    points,
  } = data.data.data.data;

  const formattedPoints =
    points || points === 0
      ? new Intl.NumberFormat("ru-RU").format(points)
      : "—";

  const onStatusClick = () => {
    onOpen("changeStatus", { id, active: isActive });
  };

  const onExpiredClick = () => {
    onOpen("changeTimeout", { id, timeout: activeBefore });
  };

  const onPointsClick = () => {
    onOpen("changePoints", { id, points });
  };

  return (
    <section className="w-full flex flex-col items-center gap-4 grow">
      <Card
        className="bg-white text-slate-950 flex flex-col rounded-xl border
    border-slate-200 shadow-sm dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800 w-full max-w-3xl pt-2"
      >
        <CardHeader className="flex justify-between gap-4 p-4 items-center border-b w-auto">
          <CardTitle
            className="overflow-hidden text-ellipsis text-xl font-semibold"
            title={LABELS.tokenId}
          >
            {id}
          </CardTitle>
          <CopyToClipboard content={id} />
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col gap-2 w-full  p-4">
            <PropertyLine title={LABELS.owner} value={owner || "—"} />
            <PropertyLine title={LABELS.comment} value={comment || "—"} />
            <PropertyLine
              title={LABELS.createdAt}
              value={format(createdAt, "dd/MM/yyyy HH:mm") || "—"}
            />
            <PropertyLine
              title={LABELS.activeBefore}
              value={
                activeBefore ? format(activeBefore, "dd/MM/yyyy HH:mm") : "—"
              }
              onEditClick={onExpiredClick}
            />
            <PropertyLine
              title={LABELS.status}
              value={isActive ? LABELS.active : LABELS.disabled}
              onEditClick={onStatusClick}
            />

            <PropertyLine
              title={LABELS.hasPrivateAccess}
              value={hasPrivateAccess ? LABELS.yes : LABELS.no}
            />

            <PropertyLine
              title={LABELS.points}
              value={String(formattedPoints ?? 0)}
              onEditClick={onPointsClick}
            />
          </div>
        </CardContent>
      </Card>
      <TokenLogs id={tokenId} />
    </section>
  );
};
