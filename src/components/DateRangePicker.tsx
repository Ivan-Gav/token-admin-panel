import { useMemo, type MouseEvent } from "react";
import { format, endOfDay, startOfDay, sub } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
// import { ru } from "react-day-picker/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import CloseIcon from "@/assets/close.svg?react";
import { IconButton } from "./ui/IconButton";
import { LABELS } from "@/constants";

type DateRangePickerProps = {
  from?: string;
  to?: string;
  onUpdate: (from?: string, to?: string) => void;
};

export function DateRangePicker({ from, to, onUpdate }: DateRangePickerProps) {
  const date: DateRange | undefined = useMemo(
    () => ({
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    }),
    [from, to]
  );

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onUpdate(undefined, undefined);
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      onUpdate(undefined, undefined);
      return;
    }

    const newFrom = startOfDay(range.from).toISOString();
    const newTo = endOfDay(range.to || range.from).toISOString();

    if (newFrom !== from || newTo !== to) {
      onUpdate(newFrom, newTo);
    }
  };

  const currentDate = new Date();
  const startDate = sub(currentDate, { years: 2 });

  return (
    <div className="flex items-center max-w-full">
      <Popover>
        <PopoverTrigger asChild className="max-w-full">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-75 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {`${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{LABELS.selectDateRange}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            min={1}
            defaultMonth={date?.from}
            startMonth={startDate}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <div className="w-6">
        {!!(from && to) && (
          <IconButton
            onClick={handleClear}
            title={LABELS.reset}
            className="p-1 size-min"
          >
            <CloseIcon className="h-4 w-4" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
