'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { setModalController } from './modalController';
import { Modal } from './ModalRoot';

export type ModalItem = {
  id: string;
  component: React.ReactNode;
  onClose?: () => void;
};

export const ModalContext = createContext<{
  modals: ModalItem[];
  open: (modal: Omit<ModalItem, 'id'>) => string;
  close: (id: string) => void;
  closeAll: () => void;
} | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((modal: Omit<ModalItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setModals((prev) => [...prev, { ...modal, id }]);
    return id;
  }, []);

  const close = useCallback((id: string) => {
    setModals((prev) => {
      prev.find((m) => m.id === id)?.onClose?.();
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  const closeAll = useCallback(() => {
    modals.forEach((m) => m.onClose?.());
    setModals([]);
  }, [modals]);

  useEffect(() => {
    setModalController({ open, close, closeAll, modals });
  }, [open, close, closeAll, modals]);

  return (
    <ModalContext.Provider value={{ modals, open, close, closeAll }}>
      {children}
      {mounted &&
        createPortal(
          <>
            {modals.map((modalItem) => (
              <Modal
                key={modalItem.id}
                open={true}
                onClose={() => close(modalItem.id)}
              >
                {modalItem.component}
              </Modal>
            ))}
          </>,
          document.body,
        )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
