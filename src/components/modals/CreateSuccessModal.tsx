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
import { LABELS } from "@/constants";

export const CreateSuccessModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "createSuccess";

  const { id } = data as Extract<typeof data, { id: string }>;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{LABELS.tokenCreated}</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center w-full p-2 border rounded-sm">
            <p className="w-auto overflow-hidden text-ellipsis" title={id}>
              {id}
            </p>
            <CopyToClipboard content={id} />
          </div>
          <DialogDescription className="text-center text-balance text-lg">
            {LABELS.whatToDo}
          </DialogDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant={"outline"} className="min-w-42" onClick={onClose}>
            {LABELS.createMoreTokens}
          </Button>

          <Link to="/" onClick={onClose}>
            <Button className="min-w-42">{LABELS.toTheList}</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
