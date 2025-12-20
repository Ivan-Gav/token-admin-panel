import { Link } from "@tanstack/react-router";

import type { Token } from "../types";
import ActiveIcon from "../assets/active.svg?react";
import AccessIcon from "../assets/access.svg?react";
import { Time } from "./ui";

//-----------------------------------------------------------

const Icons = ({
  hasPrivateAccess,
  isActive,
}: {
  hasPrivateAccess: boolean;
  isActive: boolean;
}) => {
  const activeTitle = isActive ? "активен" : "не активен";

  const accessTitle = isActive
    ? `${
        hasPrivateAccess
          ? "приватные рауты доступны"
          : "приватные рауты не доступны"
      }`
    : undefined;

  const activeClass = !isActive ? "opacity-10" : "";

  const accessClass = !hasPrivateAccess ? "opacity-10" : "";

  return (
    <div className="flex justify-end items-center gap-1">
      {isActive && (
        <span title={accessTitle}>
          <AccessIcon className={accessClass} />
        </span>
      )}

      <span title={activeTitle}>
        <ActiveIcon className={activeClass} />
      </span>
    </div>
  );
};

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

  return (
    <Link
      to={"/tokens/$id"}
      params={{ id }}
      className="grid grid-cols-12 gap-1 p-4 w-full odd:bg-gray-500/10 h-screen"
    >
      <>
        <div className="col-span-5">{id}</div>
        <div className="col-span-3 justify-self-end">
          <Time timestring={createdAt} title="создан" />
        </div>
        <div className="col-span-3 justify-self-end">
          {!!activeBefore && (
            <Time timestring={activeBefore} title="истекает" />
          )}
        </div>
        <div className="col-span-1">
          <Icons isActive={isActive} hasPrivateAccess={!!hasPrivateAccess} />
        </div>
      </>
      <>
        <div className="col-span-10">
          {!!owner && <div>{`Владелец: ${owner}`}</div>}
          {!!comment && <div>{`Комментарий: ${comment}`}</div>}
        </div>
        <div className="col-span-2 justify-self-end pr-1">
          <span>{points ?? "—"}</span>
        </div>
      </>
    </Link>
  );
};
