import { useState, useEffect, type ComponentProps } from "react";
import { Input } from "@/components/ui/Input";
import { LABELS } from "@/constants";

type Props = {
  limit: number;
  setLimit: (limit: number) => void;
} & ComponentProps<typeof Input>;

export function LimitInput({ limit, setLimit }: Props) {
  const [inputValue, setInputValue] = useState(0);

  // 2. Sync local state if page size changes externally
  useEffect(() => {
    setInputValue(limit);
  }, [limit]);

  const handleBlur = () => {
    const nextValue = Number(inputValue);
    // 3. Validate and commit on blur
    if (!isNaN(nextValue) && nextValue > 0) {
      setLimit(nextValue);
    } else {
      // Revert if invalid
      setInputValue(limit);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm font-medium">
        {`${LABELS.logsPerPage}:`}
      </span>
      <Input
        type="number"
        className="w-16"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleBlur(); // Also update on Enter key
        }}
      />
    </div>
  );
}
