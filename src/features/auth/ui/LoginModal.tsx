'use client';

import { Modal } from '@/shared/ui';
import { useAuth } from './useAuth';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const { login } = useAuth();

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Content>
        <div className="mb-4 text-center text-5xl">🔐</div>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          로그인하고 타이핑 기록을 저장하고
          <br />
          테마를 잠금해제하세요!
        </Modal.Body>
        <Modal.Footer className="flex-col">
          <button
            onClick={login}
            className="sticker-shadow flex w-full items-center justify-center gap-2 rounded-full border-4 border-[#FEE500] bg-[#FEE500] py-3 text-sm font-black uppercase tracking-wider text-[#191919] transition-transform hover:scale-105 active:scale-95"
          >
            <KakaoIcon />
            카카오로 시작하기
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const KakaoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 1C4.58 1 1 3.79 1 7.21c0 2.17 1.45 4.08 3.64 5.18-.16.56-.58 2.03-.66 2.34-.1.39.14.38.3.28.12-.08 1.94-1.32 2.73-1.86.64.09 1.3.14 1.99.14 4.42 0 8-2.79 8-6.08C17 3.79 13.42 1 9 1Z"
      fill="#191919"
    />
  </svg>
);
