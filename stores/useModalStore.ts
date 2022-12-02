import create from "zustand";

type ModalStoreProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ModalStoreProps>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
