import { useModalStore } from "@/store/useModalStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { CopyToClipboard } from "../ui/CopyToClipboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiClient } from "@/api";
import type { Response } from "@/types";
import { useEffect, useState } from "react";
import { getApiError } from "@/utils/errorHandling";
import { Field, FieldError, FieldLabel, FieldSet } from "../ui/Field";
import { DatePicker } from "../DatePicker";
import { isPastDatestring } from "@/utils/validation";
import Close from "@/assets/close.svg?react";
import { IconButton } from "../ui/IconButton";
import { cn } from "@/lib/utils";
import { ERRORS, LABELS } from "@/constants";

export const ChangeTimeoutModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "changeTimeout";

  const { id, timeout: initialTimeout } = data as Extract<
    typeof data,
    { id: string; timeout: string | undefined }
  >;

  const [date, setDate] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setDate(initialTimeout);
    }
  }, [setError, setDate, initialTimeout, isOpen]);

  useEffect(() => {
    if (date && isPastDatestring(date)) {
      setError(ERRORS.pastDate);
    } else {
      setError(null);
    }
  }, [date, setError]);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.put<Response>(api.setTokenExpireDate, {
        token_id: id,
        timeout: date,
      });

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["token", id],
      });

      onClose();
    },
    onError: (error) => {
      const message = getApiError(error);
      setError(message);
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{LABELS.changeActiveBefore}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-2 border rounded-sm">
            <DialogDescription
              className="w-auto overflow-hidden text-ellipsis"
              title={id}
            >
              {id}
            </DialogDescription>
            <CopyToClipboard content={id} />
          </div>
        </div>

        <FieldSet className="flex justify-center items-center gap-3 self-center py-8">
          <div className="flex justify-center gap-3">
            <Field className="w-fit">
              <FieldLabel>{LABELS.activeBefore}</FieldLabel>
              <div className="flex items-center">
                <DatePicker dateString={date} setDateString={setDate} />
                <IconButton
                  onClick={() => {
                    setError(null);
                    setDate(undefined);
                  }}
                  className={cn(
                    "h-full px-2 py-2 size-fit cursor-pointer",
                    !date &&
                      !error &&
                      "opacity-0 cursor-default pointer-events-none"
                  )}
                >
                  <Close className="w-4 h-4 p-0" />
                </IconButton>
              </div>
            </Field>
          </div>
          <FieldError>{error}</FieldError>
        </FieldSet>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant={"outline"} className="min-w-42" onClick={onClose}>
            {LABELS.cancel}
          </Button>

          <Button
            className="min-w-42"
            disabled={date === initialTimeout || isPending || !!error}
            onClick={handleSubmit}
          >
            {LABELS.submit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
