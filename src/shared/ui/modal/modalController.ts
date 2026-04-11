import type { ModalContextType } from './types';

let modalController: ModalContextType | null = null;

export const setModalController = (controller: ModalContextType) => {
  modalController = controller;
};

export const getModalController = () => {
  if (!modalController) throw new Error('ModalController is not set');
  return modalController;
};
