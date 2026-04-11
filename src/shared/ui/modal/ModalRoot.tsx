'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

/* ── Modal 루트 (오버레이 + 스크롤 잠금) ──────────────── */
export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

/* ── Content (키드코어 카드) ──────────────────────────── */
Modal.Content = function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'relative w-full max-w-sm rounded-3xl border-[6px] border-white bg-white p-6 sticker-shadow dark:bg-surface',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 광택 오버레이 */}
      <div className="plastic-shine pointer-events-none absolute inset-0 rounded-3xl" />
      {children}
    </div>
  );
};

/* ── Header ──────────────────────────────────────────── */
Modal.Header = function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-3 text-center text-xl font-black uppercase tracking-tight text-text-main bubble-text-shadow',
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ── Body ────────────────────────────────────────────── */
Modal.Body = function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-6 text-center text-sm font-medium text-text-sub',
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ── Footer ──────────────────────────────────────────── */
Modal.Footer = function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex gap-3', className)}>{children}</div>;
};
