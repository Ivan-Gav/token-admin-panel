import { Link } from "@tanstack/react-router";

import type { Token } from "../types";
import ActiveIcon from "@/assets/active.svg?react";
import AccessIcon from "@/assets/access.svg?react";
import { Time } from "./ui/Time";
import { Button } from "./ui/Button";
import { CopyToClipboard } from "./ui/CopyToClipboard";
import { LABELS } from "@/constants";

//-----------------------------------------------------------

export const TokenItem = ({ item }: { item: Token }) => {
  const {
    id,
    active_before: activeBefore,
    created_at: createdAt,
    comment,
    has_private_access: hasPrivateAccess,
    is_active: isActive,
    owner,
    points,
  } = item;

  const formattedPoints =
    points || points === 0
      ? new Intl.NumberFormat("ru-RU").format(points)
      : "—";

  return (
    <li
      className="list-none bg-white text-slate-950 flex flex-col rounded-xl border
    border-slate-200 shadow-sm dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800 w-full max-w-200"
    >
      <div className="flex justify-between gap-4 p-4 items-center border-b w-auto">
        <div
          className="overflow-hidden text-ellipsis text-xl font-semibold"
          title={LABELS.tokenId}
        >
          {id}
        </div>
        <CopyToClipboard content={id} />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-2 w-full md:w-132 p-4">
          {!!owner && (
            <div>
              <span className="font-semibold inline-block min-w-30">
                {`${LABELS.owner}: `}
              </span>
              <span>{owner}</span>
            </div>
          )}

          {!!comment && (
            <div className="line-clamp-4">
              <span className="font-semibold inline-block min-w-30">
                {`${LABELS.comment}: `}
              </span>
              <span>{comment}</span>
            </div>
          )}

          <div className="">
            <span className="font-semibold inline-block min-w-30">
              {`${LABELS.createdAt}: `}
            </span>
            <Time timestring={createdAt} title={LABELS.createdAt} />
          </div>

          <div className="">
            <span className="font-semibold inline-block min-w-30">
              {`${LABELS.activeBefore}: `}
            </span>
            {activeBefore ? (
              <Time timestring={activeBefore} title={LABELS.activeBefore} />
            ) : (
              "—"
            )}
          </div>

          <Link
            to={"/tokens/$id"}
            params={{ id }}
            className="w-fit justify-self-end mt-auto hidden md:block"
          >
            <Button variant={"outline"} size={"lg"}>
              {LABELS.details}
            </Button>
          </Link>
        </div>

        <div className="flex flex-col w-full md:w-52 p-4 gap-2">
          <div className="flex justify-between">
            {isActive ? (
              <>
                <div>{LABELS.active}</div>
                <ActiveIcon className="text-green-600 min-w-6" />
              </>
            ) : (
              <>
                <div>{LABELS.disabled}</div>
                <ActiveIcon className="opacity-10 min-w-6" />
              </>
            )}
          </div>

          <div className="flex justify-between">
            {hasPrivateAccess ? (
              <>
                <div className="text-wrap">{LABELS.hasPrivateAccess}</div>
                <AccessIcon className="text-green-600 min-w-6" />
              </>
            ) : (
              <>
                <div className="text-wrap shrink">{LABELS.noPrivateAccess}</div>
                <AccessIcon className="opacity-20 min-w-6" />
              </>
            )}
          </div>

          <hr />

          <div className="w-full flex flex-col items-center gap-1">
            <div className="text-2xl font-bold">{formattedPoints}</div>
          </div>

          <Link
            to={"/tokens/$id"}
            params={{ id }}
            className="w-fit self-center md:hidden"
          >
            <Button variant={"outline"}>{LABELS.details}</Button>
          </Link>
        </div>
      </div>
    </li>
  );
};
