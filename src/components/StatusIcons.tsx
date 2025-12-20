import ActiveIcon from "../assets/active.svg?react";
import AccessIcon from "../assets/access.svg?react";

//-----------------------------------------------------------

export const StatusIcons = ({
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
