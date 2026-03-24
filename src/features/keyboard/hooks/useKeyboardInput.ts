import { useEffect } from 'react';
import type { Application } from '@splinetool/runtime';
import { useTypingSound } from './useTypingSound';

const KEY_OFFSET = 10;

// 타이핑에 필요한 물리 키 → Spline 오브젝트 이름 매핑
const KEY_MAP: Record<string, string> = {
  // 자음 (QWERTY 상단)
  KeyQ: 'key_Q', // ㅂ
  KeyW: 'key_W', // ㅈ
  KeyE: 'key_E', // ㄷ
  KeyR: 'key_R', // ㄱ
  KeyT: 'key_T', // ㅅ
  // 모음 (QWERTY 상단)
  KeyY: 'key_Y', // ㅛ
  KeyU: 'key_U', // ㅕ
  KeyI: 'key_I', // ㅑ
  KeyO: 'key_O', // ㅐ
  KeyP: 'key_P', // ㅔ
  // 자음+모음 (중단)
  KeyA: 'key_A', // ㅁ
  KeyS: 'key_S', // ㄴ
  KeyD: 'key_D', // ㅇ
  KeyF: 'key_F', // ㄹ
  KeyG: 'key_G', // ㅎ
  KeyH: 'key_H', // ㅗ
  KeyJ: 'key_J', // ㅓ
  KeyK: 'key_K', // ㅏ
  KeyL: 'key_L', // ㅣ
  // 자음+모음 (하단)
  KeyZ: 'key_Z', // ㅋ
  KeyX: 'key_X', // ㅌ
  KeyC: 'key_C', // ㅊ
  KeyV: 'key_V', // ㅍ
  KeyB: 'key_B', // ㅠ
  KeyN: 'key_N', // ㅜ
  KeyM: 'key_M', // ㅡ
  // 특수키
  Period: 'key_PERIOD', // .
  Comma: 'key_COMMA', // ,
  Space: 'key_SPACE',
  Backspace: 'key_BACKSPACE',
  Enter: 'key_ENTER',
  ShiftLeft: 'key_shift', // 쌍자음용
};

export function useKeyboardInput(
  splineRef: React.RefObject<Application | null>,
) {
  const currentTheme = 'honey';
  const { playTypingSound } = useTypingSound(currentTheme);
  useEffect(() => {
    // 키 중복 방지 (꾹 누르고 있을 때 반복 발생 차단)
    const pressedKeys = new Set<string>();

    function handleKeyDown(e: KeyboardEvent) {
      const spline = splineRef.current;
      if (!spline) return;

      const splineName = KEY_MAP[e.code];
      if (!splineName || pressedKeys.has(e.code)) return;

      pressedKeys.add(e.code);
      const obj = spline.findObjectByName(splineName);
      if (obj) obj.position.y -= KEY_OFFSET;

      playTypingSound();
    }

    function handleKeyUp(e: KeyboardEvent) {
      const spline = splineRef.current;
      if (!spline) return;

      const splineName = KEY_MAP[e.code];
      if (!splineName) return;

      pressedKeys.delete(e.code);
      const obj = spline.findObjectByName(splineName);
      if (obj) obj.position.y += KEY_OFFSET;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [splineRef]);
}
