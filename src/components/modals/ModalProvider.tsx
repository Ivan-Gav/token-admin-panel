import { ChangePointsModal } from "./ChangePointsModal";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ChangeTimeoutModal } from "./ChangeTimeoutModal";
import { ConfirmPrivateAccessModal } from "./ConfirmPrivateAccessModal";
import { CreateSuccessModal } from "./CreateSuccessModal";

export const ModalProvider = () => {
  return (
    <>
      <CreateSuccessModal />
      <ChangeStatusModal />
      <ChangeTimeoutModal />
      <ChangePointsModal />
      <ConfirmPrivateAccessModal />
    </>
  );
};
