"use client";

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
import { useEffect, useState, type ChangeEvent } from "react";
import { getApiError } from "@/utils/errorHandling";
import { Field, FieldError, FieldSet } from "../ui/Field";

import { Input } from "../ui/Input";

//--------------------------------------------------------------------

const formatPoints = (points?: number) =>
  points ? new Intl.NumberFormat("ru-RU").format(points) : "0";

const cleanInput = (val: string) => val.replace(/\D/g, "");

//--------------------------------------------------------------------

export const ChangePointsModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "changePoints";

  const { id, points: initialPoints } = data as Extract<
    typeof data,
    { id: string; points: number | undefined }
  >;

  const [points, setPoints] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  const sum = initialPoints + (points ?? 0);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setPoints(0);
    }
  }, [setError, setPoints, initialPoints, isOpen]);

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanInput(e.target.value);
    setError(null);
    if (cleaned === "") {
      setPoints(0);
      return;
    }
    setPoints(parseInt(cleaned, 10));
  };

  const handleSumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanInput(e.target.value);
    if (cleaned === "") {
      setPoints(-initialPoints);
      return;
    }

    const newSum = parseInt(cleaned, 10);

    if (newSum < 0) {
      setError("Баланс не может быть отрицательным");
    } else {
      setError(null);
    }
    setPoints(newSum - initialPoints);
  };

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.put<Response>(api.setTokenPoints, {
        token_id: id,
        points: points,
        mode: "add",
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
          <DialogTitle>{"Изменить баланс"}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-2 border rounded-sm">
            <div className="w-auto overflow-hidden text-ellipsis" title={id}>
              {id}
            </div>
            <CopyToClipboard content={id} />
          </div>

          {initialPoints ? (
            <>
              <DialogDescription className="whitespace-pre-wrap">
                <span>
                  {"Текущий баланс - "}
                  <strong>{formatPoints(initialPoints)}</strong>
                </span>
                <br />
                <span>
                  {
                    "Вы можете вычесть или добавить пункты к балансу а также отредактировать всю сумму."
                  }
                </span>
              </DialogDescription>
              <FieldSet className="flex flex-col sm:flex-row justify-center items-center gap-3 self-center pt-4 pb-0">
                <Input disabled value={initialPoints} />

                <div>{"+"}</div>

                <Input value={points} onChange={handlePointsChange} />

                <div>{"="}</div>

                <Input value={sum} onChange={handleSumChange} />
              </FieldSet>
              <div className="min-h-10">
                <FieldError>{error}</FieldError>
              </div>
            </>
          ) : (
            <>
              <DialogDescription className="whitespace-pre-wrap">
                <span>{"Текущий баланс равен 0. Пополнить?"}</span>
              </DialogDescription>
              <FieldSet className="flex flex-col sm:flex-row justify-center items-center gap-3 self-center pt-4 pb-0">
                <Input value={points} onChange={handlePointsChange} />
              </FieldSet>
              <div className="min-h-10">
                <FieldError>{error}</FieldError>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant={"outline"} className="min-w-42" onClick={onClose}>
            {"Отменить"}
          </Button>

          <Button
            className="min-w-42"
            disabled={points === initialPoints || isPending || !!error}
            onClick={handleSubmit}
          >
            {"Подтвердить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
