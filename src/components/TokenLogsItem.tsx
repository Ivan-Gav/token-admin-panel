import type { TokenLogItem } from "@/types";
import SuccessIcon from "@/assets/active.svg?react";
import FailureIcon from "@/assets/circle-close.svg?react";
import { Time } from "./ui/Time";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { LABELS } from "@/constants";

//-----------------------------------------------------------

type Props = {
  item: TokenLogItem;
};

//-----------------------------------------------------------

const Line = ({ children }: PropsWithChildren) => (
  <div className="w-auto overflow-hidden text-ellipsis">{children}</div>
);

//-----------------------------------------------------------

const Name = ({ children }: PropsWithChildren) => (
  <span className="font-semibold inline-block min-w-22">{children}</span>
);

//-----------------------------------------------------------

const Status = ({ success }: { success: boolean }) =>
  success ? (
    <SuccessIcon className="w-6 h-6 absolute top-1 right-0" />
  ) : (
    <FailureIcon className="w-6 h-6 absolute top-1 right-0" />
  );

//-----------------------------------------------------------

export const TokenLogsItem = ({ item }: Props) => {
  const {
    timestamp,
    endpoint_path: endpointPath,
    price,
    trace_id: traceId,
    success,
  } = item;
  return (
    <li
      className={cn(
        "w-full flex flex-col gap-0 border-b last:border-b-0 py-2 relative",
        success ? "text-green-600" : "text-red-600"
      )}
    >
      <Line>
        <Name>{`${LABELS.time}: `}</Name>
        <Time timestring={timestamp} />
      </Line>
      <Line>
        <Name>{`${LABELS.endpoint}: `}</Name>
        <span>{endpointPath}</span>
      </Line>
      <Line>
        <Name>{`${LABELS.price}: `}</Name>
        <span>{price}</span>
      </Line>
      <Line>
        <Name>{`${LABELS.traceId}: `}</Name>
        <span>{traceId}</span>
      </Line>
      <Status success={success} />
    </li>
  );
};
