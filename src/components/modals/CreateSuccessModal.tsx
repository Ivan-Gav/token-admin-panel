// components/modals/confirm-delete-modal.tsx
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
import { Link } from "@tanstack/react-router";

export const CreateSuccessModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { id },
  } = useModalStore();

  const isModalOpen = isOpen && type === "createSuccess";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Токен успешно создан"}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-2 border rounded-sm">
            <p className="w-auto overflow-hidden text-ellipsis" title={id}>
              {id}
            </p>
            <CopyToClipboard content={id} />
          </div>
          <DialogDescription className="text-center text-balance text-lg">
            {
              "Вы можете продолжить создание токенов или перейти к списку токенов?"
            }
          </DialogDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant={"outline"} className="min-w-42" onClick={onClose}>
            {"Создать еще токен"}
          </Button>

          <Link to="/" onClick={onClose}>
            <Button className="min-w-42">{"Перейти к списку"}</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
