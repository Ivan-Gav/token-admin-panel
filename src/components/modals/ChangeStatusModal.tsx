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
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiClient } from "@/api";
import type { Response } from "@/types";
import { useState } from "react";
import { getApiError } from "@/utils/errorHandling";
import { FieldError, FieldSet } from "../ui/Field";
import { LABELS } from "@/constants";

export const ChangeStatusModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "changeStatus";

  const { id, active: initialActive } = data as Extract<
    typeof data,
    { id: string; active: boolean }
  >;

  const [active, setActive] = useState(initialActive);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.put<Response>(api.activateToken, {
        token_id: id,
        active,
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
          <DialogTitle>{LABELS.changeTokenStatus}</DialogTitle>
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
            <Checkbox
              id="terms"
              className="size-7"
              checked={active}
              onCheckedChange={(checked) => {
                setError(null);
                setActive(checked === true);
              }}
            />
            <Label htmlFor="terms" className="text-xl">
              {LABELS.active}
            </Label>
          </div>
          <FieldError>{error}</FieldError>
        </FieldSet>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant={"outline"} className="min-w-42" onClick={onClose}>
            {LABELS.cancel}
          </Button>

          <Button
            className="min-w-42"
            disabled={active === initialActive || isPending || !!error}
            onClick={handleSubmit}
          >
            {LABELS.submit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
