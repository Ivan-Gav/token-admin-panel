import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import Chevron from "@/assets/chevron.svg?react";
import { TokenLogsList } from "./TokenLogsList";
import { LABELS } from "@/constants";

type Props = {
  id: string;
};

export const TokenLogs = ({ id }: Props) => {
  return (
    <section
      className="bg-white text-slate-950 flex flex-col rounded-xl border
    border-slate-200 shadow-sm dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800 w-full max-w-3xl"
    >
      <Collapsible>
        <div className="flex justify-between items-center py-2 px-4">
          <div>{LABELS.tokenLogs}</div>
          <CollapsibleTrigger>
            <Chevron />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <TokenLogsList id={id} />
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
