import { useState } from "react";
import { parseJSON } from "date-fns";

import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import ChevronDownIcon from "@/assets/chevron.svg?react";

type Props = {
  dateString: string | undefined;
  setDateString: (date: string | undefined) => void;
};

export function DatePicker({ dateString, setDateString }: Props) {
  const [open, setOpen] = useState(false);

  const date = dateString ? parseJSON(dateString) : undefined;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Выбрать дату"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDateString(date ? date.toISOString() : undefined);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
