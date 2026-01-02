import { useModalStore } from "@/store/useModalStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { LABELS } from "@/constants";

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
          <DialogTitle>{LABELS.confirmHasPrivateAccess}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <DialogDescription className="text-center text-balance text-lg my-3">
            {`${LABELS.confirmHasPrivateAccessPrompt1} `}
            <strong className="text-red-600">{LABELS.hasPrivateAccess}</strong>
            {`. ${LABELS.confirmHasPrivateAccessPrompt2}`}
          </DialogDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant={"outline"}
            className="min-w-42"
            onClick={() => handleAction(false)}
          >
            {LABELS.backToTheForm}
          </Button>

          <Button className="min-w-42" onClick={() => handleAction(true)}>
            {LABELS.createToken}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
