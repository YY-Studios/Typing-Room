'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import {
  KEYBOARD_THEMES,
  createMaterials,
  BASE_NAMES,
  PINK_KEYS,
} from '../constants/keyboardDesign';
import { useUnlockStore } from '@/shared/stores/useUnlockStore';
import { HoneyOverlay } from './overlays/HoneyOverlay';

// 테마 ID → 오버레이 컴포넌트 맵
// 새 테마 추가 시 여기에만 항목 추가
const THEME_OVERLAYS: Record<string, React.FC> = {
  honey: HoneyOverlay,
};

interface KeyboardModelProps {
  materials: ReturnType<typeof createMaterials>;
}

/**
 * 키보드 3D 모델 컴포넌트
 *
 * @description GLB 파일을 로드하여 Three.js scene으로 렌더링
 * - materials prop으로 테마 색상 동적 적용
 */
const KeyboardModel = ({ materials }: KeyboardModelProps) => {
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
        mesh.material = materials.BASE;
      } else if (mesh.parent && PINK_KEYS.includes(mesh.parent.name)) {
        mesh.material = materials.KEYS;
      } else {
        mesh.material = materials.ACCENT;
      }
    });
  }, [scene, materials]);

  // DEBUG: 키보드 바운딩 박스 확인용 (확인 후 제거)
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    console.log('keyboard bbox (local):', {
      min: box.min.toArray().map((v: number) => +v.toFixed(1)),
      max: box.max.toArray().map((v: number) => +v.toFixed(1)),
    });
  }, [scene]);

  return <primitive object={scene} scale={0.3} rotation={[0.5, 0, 0.015]} />;
};

useGLTF.preload('/models/keyboard.glb');

/**
 * 키보드 Canvas 래퍼 컴포넌트
 *
 * @description activeThemeId에 따라 테마 색상 + 오버레이를 동적으로 적용
 */
export const BaseKeyboard = () => {
  const activeThemeId = useUnlockStore((s) => s.activeThemeId);

  const materials = useMemo(() => {
    const theme = KEYBOARD_THEMES[activeThemeId] ?? KEYBOARD_THEMES['default'];
    return createMaterials(theme);
  }, [activeThemeId]);

  const Overlay = THEME_OVERLAYS[activeThemeId];

  return (
    <div className="w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas style={{ zIndex: 0 }} camera={{ position: [0, 8, 20], fov: 45 }}>
        <ambientLight intensity={3} />
        <directionalLight position={[1, 100, 1]} intensity={1} />
        <KeyboardModel materials={materials} />
        {Overlay && <Overlay />}
      </Canvas>
    </div>
  );
};
