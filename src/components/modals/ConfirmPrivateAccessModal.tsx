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

export const ConfirmPrivateAccessModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "confirmPrivateAccess";

  const { resolve } = data as Extract<
    typeof data,
    { id?: string; resolve: (value: boolean | PromiseLike<boolean>) => void }
  >;

  const handleAction = (result: boolean) => {
    resolve(result);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleAction(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Подтвердите доступ к приватным методам"}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <DialogDescription className="text-center text-balance text-lg my-3">
            Вы выбрали опцию{" "}
            <strong className="text-red-600">
              Предоставить доступ к приватным методам
            </strong>
            . Подтвердите создание токена с такими правами или вернитесь к форме
            редактирования.
          </DialogDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant={"outline"}
            className="min-w-42"
            onClick={() => handleAction(false)}
          >
            {"Вернуться к форме"}
          </Button>

          <Button className="min-w-42" onClick={() => handleAction(true)}>
            {"Создать токен"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
