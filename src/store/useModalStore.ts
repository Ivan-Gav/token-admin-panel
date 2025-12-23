// store/use-modal-store.ts
import { create } from "zustand";

interface ModalData {
  createSuccess: { id: string };
  //   editUser: { id: string; email: string; role: 'admin' | 'user' };
  //   createPost: { categoryId?: string };
  // Add more as needed...
}

type ModalType = keyof ModalData;

interface ModalStore {
  type: ModalType | null;
  data: ModalData[ModalType] | Record<string, any>;
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
