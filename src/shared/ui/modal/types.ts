import type { ModalItem } from './ModalProvider';

export type ModalContextType = {
  modals: ModalItem[];
  open: (modal: Omit<ModalItem, 'id'>) => string;
  close: (id: string) => void;
  closeAll: () => void;
};
