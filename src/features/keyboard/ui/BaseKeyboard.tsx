'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { MATERIALS, BASE_NAMES, PINK_KEYS } from '../constants/keyboardDesign';

/**
 * 키보드 3D 모델 컴포넌트
 *
 * @description GLB 파일을 로드하여 Three.js scene으로 렌더링
 * - BASE_NAMES: 키보드 베이스 플레이트 색상 적용
 * - PINK_KEYS: 알파벳 키캡 핑크 색상 적용
 * - 글자/화살표 mesh(Text-control, Arrow)는 색상 변경 제외
 * - useKeyboardInput 훅으로 키 입력 감지 및 타이핑 소리 재생
 *
 * @see {@link useKeyboardInput} 키 입력 + 소리 재생 훅
 * @see {@link module:keyboardDesign} 색상/키 목록 상수
 */
const KeyboardModel = () => {
  const { scene } = useGLTF('/models/keyboard.glb');

  useKeyboardInput(scene as THREE.Group);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;

      // 글자/화살표 mesh는 건드리지 않음
      if (mesh.name.startsWith('Text-control') || mesh.name.startsWith('Arrow'))
        return;

      if (BASE_NAMES.includes(mesh.name)) {
        mesh.material = MATERIALS.BASE;
      } else if (mesh.parent && PINK_KEYS.includes(mesh.parent.name)) {
        mesh.material = MATERIALS.PINK;
      } else {
        mesh.material = MATERIALS.CREAM;
      }
    });
  }, [scene]);
  return <primitive object={scene} scale={0.3} rotation={[0.5, 0, 0.015]} />;
};

useGLTF.preload('/models/keyboard.glb');

/**
 * 키보드 Canvas 래퍼 컴포넌트
 *
 * @description R3F Canvas + 조명 설정을 포함한 최상위 키보드 컴포넌트
 * - pointer-events-none: 3D 캔버스가 하위 UI 클릭 이벤트를 막지 않도록 설정
 * - camera.position [x, y, z]: 카메라 위치 (z 높을수록 멀어짐)
 * - camera.fov: 시야각 (높을수록 넓게 보임)
 * - ambientLight: 전체 균일 조명
 * - directionalLight: 방향성 조명 (입체감 부여)
 */
export const BaseKeyboard = () => {
  return (
    <div className="w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas style={{ zIndex: 0 }} camera={{ position: [0, 8, 20], fov: 45 }}>
        <ambientLight intensity={3} />
        <directionalLight position={[1, 100, 1]} intensity={1} />
        <KeyboardModel />
      </Canvas>
    </div>
  );
};
