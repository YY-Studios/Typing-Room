import * as THREE from 'three';

/**
 * 키보드 3D 모델 재질 상수
 *
 * @description 컴포넌트 외부에 선언하여 리렌더링마다 새로 생성되지 않도록 최적화
 * - BASE: 키보드 베이스 플레이트 (핑크 계열)
 * - PINK: 알파벳 키캡 (연핑크)
 * - CREAM: 특수키 키캡 (크림)
 */
export const MATERIALS = {
  BASE: new THREE.MeshStandardMaterial({ color: '#E8848A' }),
  PINK: new THREE.MeshStandardMaterial({ color: '#F4A0A0' }),
  CREAM: new THREE.MeshStandardMaterial({ color: '#F5ECD7' }),
};

/**
 * 키보드 베이스 플레이트 mesh 이름 목록
 *
 * @description traverse 시 BASE 재질을 적용할 mesh 이름
 */
export const BASE_NAMES = ['keyboard-base', 'Rectangle_2'];

/**
 * 핑크 색상을 적용할 키 오브젝트 이름 목록
 *
 * @description GLB 내 Object3D 이름 기준
 * - 알파벳 키 + 특수키(TAB, ESC, BACKSPACE, ENTER) 포함
 * - KEY_MAP과 함께 관리
 * @see {@link KEY_MAP} 키 입력 매핑
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
