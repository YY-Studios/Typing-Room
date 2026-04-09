import { useEffect } from 'react';
import type { Group } from 'three';
import { useTypingSound } from './useTypingSound';

/** 키캡 Y축 이동 오프셋 (누름 효과 크기) */
const KEY_OFFSET = 10;

/**
 * 물리 키 코드 → GLB 오브젝트 이름 매핑
 *
 * @description e.code 기준으로 GLB 내 오브젝트를 찾기 위한 매핑 테이블
 * - Key_Instance 계열 키(Comma, Period, Slash 등)는 GLB에 이름 없어 미포함
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code} KeyboardEvent.code
 */
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

/**
 * 키보드 입력 감지 + 타이핑 소리 재생 훅
 *
 * @description keydown/keyup 이벤트로 GLB 키캡 Y축을 이동시켜 누름 효과 구현
 * - pressedKeys Set으로 꾹 누름 시 중복 발생 방지
 * - KEY_MAP 기준으로 e.code → GLB 오브젝트 이름 변환
 * - keydown: position.y -= KEY_OFFSET (키 내려감)
 * - keyup: position.y += KEY_OFFSET (키 올라옴)
 *
 * @param scene - useGLTF로 로드한 Three.js Group 객체
 * @see {@link KEY_MAP} 키 입력 매핑 테이블
 * @see {@link useTypingSound} 타이핑 소리 재생 훅
 */
export function useKeyboardInput(scene: Group) {
  const currentTheme = 'honey';
  const { playTypingSound } = useTypingSound(currentTheme);

  useEffect(() => {
    const pressedKeys = new Set<string>();
    const basePositions = new Map<string, number>(); // 원래 Y값 저장 (IME drift 방지)

    function handleKeyDown(e: KeyboardEvent) {
      const splineName = KEY_MAP[e.code];
      if (!splineName || pressedKeys.has(e.code)) return;

      pressedKeys.add(e.code);
      const obj = scene.getObjectByName(splineName);
      if (obj) {
        basePositions.set(e.code, obj.position.y); // 원래 위치 저장
        obj.position.y -= KEY_OFFSET;
      }

      playTypingSound();
    }

    function handleKeyUp(e: KeyboardEvent) {
      const splineName = KEY_MAP[e.code];
      if (!splineName) return;

      pressedKeys.delete(e.code);
      const obj = scene.getObjectByName(splineName);
      if (obj) {
        const baseY = basePositions.get(e.code);
        if (baseY !== undefined) {
          obj.position.y = baseY; // 원래 위치로 복원 (keyup 중복 발생해도 drift 없음)
          basePositions.delete(e.code);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [scene]);
}
