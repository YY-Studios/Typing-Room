import React from 'react';
import { getModalController } from './modalController';
import { Modal } from './ModalRoot';

type ModalOptions = {
  title?: string;
  emoji?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

const CancelButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="flex-1 rounded-full border-4 border-gray-200 bg-gray-100 py-3 text-sm font-black uppercase tracking-wider text-gray-600 transition-transform hover:scale-105 active:scale-95 dark:border-white/20 dark:bg-white/10 dark:text-white/70"
  >
    {label}
  </button>
);

const ConfirmButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="flex-1 rounded-full border-4 border-primary bg-primary py-3 text-sm font-black uppercase tracking-wider text-white sticker-shadow transition-transform hover:scale-105 active:scale-95"
  >
    {label}
  </button>
);

const DangerButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="flex-1 rounded-full border-4 border-red-300 bg-red-500 py-3 text-sm font-black uppercase tracking-wider text-white sticker-shadow transition-transform hover:scale-105 active:scale-95"
  >
    {label}
  </button>
);

export const modal = {
  alert: (message: string, options?: ModalOptions) => {
    return new Promise<void>((resolve) => {
      const { open, close } = getModalController();
      const id = open({
        component: (
          <Modal.Content>
            {options?.emoji && (
              <div className="mb-4 text-center text-5xl">{options.emoji}</div>
            )}
            <Modal.Header>{options?.title ?? '알림'}</Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <ConfirmButton
                label={options?.confirmText ?? '확인'}
                onClick={() => {
                  close(id);
                  resolve();
                }}
              />
            </Modal.Footer>
          </Modal.Content>
        ),
        onClose: () => resolve(),
      });
    });
  },

  confirm: (message: string, options?: ModalOptions) => {
    return new Promise<boolean>((resolve) => {
      const { open, close } = getModalController();
      const id = open({
        component: (
          <Modal.Content>
            {options?.emoji && (
              <div className="mb-4 text-center text-5xl">{options.emoji}</div>
            )}
            <Modal.Header>{options?.title ?? '확인'}</Modal.Header>
            <Modal.Body>
              {message}
              {options?.description && (
                <p className="mt-1 text-xs text-text-sub">
                  {options.description}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <CancelButton
                label={options?.cancelText ?? '취소'}
                onClick={() => {
                  close(id);
                  resolve(false);
                }}
              />
              <ConfirmButton
                label={options?.confirmText ?? '확인'}
                onClick={() => {
                  close(id);
                  resolve(true);
                }}
              />
            </Modal.Footer>
          </Modal.Content>
        ),
        onClose: () => resolve(false),
      });
    });
  },

  danger: (message: string, options?: ModalOptions) => {
    return new Promise<boolean>((resolve) => {
      const { open, close } = getModalController();
      const id = open({
        component: (
          <Modal.Content>
            {options?.emoji && (
              <div className="mb-4 text-center text-5xl">{options.emoji}</div>
            )}
            <Modal.Header>{options?.title ?? '정말요?'}</Modal.Header>
            <Modal.Body>
              {message}
              {options?.description && (
                <p className="mt-1 text-xs text-text-sub">
                  {options.description}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <CancelButton
                label={options?.cancelText ?? '취소'}
                onClick={() => {
                  close(id);
                  resolve(false);
                }}
              />
              <DangerButton
                label={options?.confirmText ?? '삭제'}
                onClick={() => {
                  close(id);
                  resolve(true);
                }}
              />
            </Modal.Footer>
          </Modal.Content>
        ),
        onClose: () => resolve(false),
      });
    });
  },

  custom: (component: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      const { open } = getModalController();
      open({
        component,
        onClose: () => resolve(),
      });
    });
  },
};
