import * as THREE from 'three';

/**
 * 키보드 테마 색상 타입
 */
export interface KeyboardTheme {
  colors: {
    base: string; // 키보드 베이스 플레이트
    keys: string; // 알파벳 키캡
    accent: string; // 특수키 키캡
  };
}

/**
 * 키보드 테마 목록
 *
 * @description 새 테마 추가 시 이 객체에 항목만 추가하면 됨
 */
export const KEYBOARD_THEMES: Record<string, KeyboardTheme> = {
  default: {
    colors: { base: '#E8848A', keys: '#F4A0A0', accent: '#F5ECD7' },
  },
  honey: {
    colors: { base: '#FF8C00', keys: '#FFFFFF', accent: '#FFB800' },
  },
};

/**
 * 테마 색상으로 Three.js 재질 생성
 *
 * @description useMemo와 함께 사용 — activeKeyboardId 변경 시에만 재생성
 */
export const createMaterials = (theme: KeyboardTheme) => ({
  BASE: new THREE.MeshStandardMaterial({ color: theme.colors.base }),
  KEYS: new THREE.MeshStandardMaterial({ color: theme.colors.keys }),
  ACCENT: new THREE.MeshStandardMaterial({ color: theme.colors.accent }),
});

/**
 * 키보드 베이스 플레이트 mesh 이름 목록
 */
export const BASE_NAMES = ['keyboard-base', 'Rectangle_2'];

/**
 * 키 색상(KEYS)을 적용할 키 오브젝트 이름 목록
 *
 * @description GLB 내 Object3D 이름 기준
 */
export const PINK_KEYS = [
  'key_TAB',
  'key_ESC',
  'key_BACKSPACE',
  'key_ENTER',
  'key_Q',
  'key_W',
  'key_E',
  'key_R',
  'key_T',
  'key_Y',
  'key_U',
  'key_I',
  'key_O',
  'key_P',
  'key_A',
  'key_S',
  'key_D',
  'key_F',
  'key_G',
  'key_H',
  'key_J',
  'key_K',
  'key_L',
  'key_Z',
  'key_X',
  'key_C',
  'key_V',
  'key_B',
  'key_N',
  'key_M',
];
