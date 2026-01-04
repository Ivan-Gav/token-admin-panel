import { useModalStore } from "@/store/useModalStore";
import { ChangePointsModal } from "./ChangePointsModal";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ChangeTimeoutModal } from "./ChangeTimeoutModal";
import { ConfirmPrivateAccessModal } from "./ConfirmPrivateAccessModal";
import { CreateSuccessModal } from "./CreateSuccessModal";

export const ModalProvider = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {type === "createSuccess" && <CreateSuccessModal />}
      {type === "changeStatus" && <ChangeStatusModal />}
      {type === "changeTimeout" && <ChangeTimeoutModal />}
      {type === "changePoints" && <ChangePointsModal />}
      {type === "confirmPrivateAccess" && <ConfirmPrivateAccessModal />}
    </>
  );
};
