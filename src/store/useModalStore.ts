import { create } from "zustand";

interface ModalData {
  createSuccess: { id: string };
  changeStatus: { id: string; active: boolean };
  changeTimeout: { id: string; timeout?: string };
  changePoints: { id: string; points?: number };
  confirmPrivateAccess: {
    id?: string;
    resolve: (value: boolean | PromiseLike<boolean>) => void;
  };
}

type ModalType = keyof ModalData;

interface ModalStore {
  type: ModalType | null;
  data: ModalData[ModalType] | Record<string, unknown>;
  isOpen: boolean;
  onOpen: <T extends ModalType>(type: T, data?: ModalData[T]) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
