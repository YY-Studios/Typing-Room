'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── 재질 ──────────────────────────────────────────────────
const MAT_BODY = new THREE.MeshStandardMaterial({
  color: '#FFD000',
  roughness: 0.3,
  metalness: 0.05,
});
const MAT_STRIPE = new THREE.MeshStandardMaterial({
  color: '#1a1a1a',
  roughness: 0.5,
});
const MAT_EYE = new THREE.MeshStandardMaterial({
  color: '#111111',
  roughness: 0.2,
  metalness: 0.3,
});
const MAT_WING = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  transparent: true,
  opacity: 0.35,
  roughness: 0.05,
  metalness: 0.1,
  side: THREE.DoubleSide,
});
const MAT_HONEY = new THREE.MeshStandardMaterial({
  color: '#FFB830',
  transparent: true,
  opacity: 0.7,
  roughness: 0.15,
  metalness: 0.15,
});
const MAT_HONEY_THICK = new THREE.MeshStandardMaterial({
  color: '#E8A010',
  transparent: true,
  opacity: 0.85,
  roughness: 0.1,
  metalness: 0.2,
});

// ── 타입 ──────────────────────────────────────────────────
interface BeeConfig {
  x: number;
  z: number;
  phaseX: number;
  phaseZ: number;
  speed: number;
  loopDir: 1 | -1;
}

// ── 설정값 ────────────────────────────────────────────────
const BEE_CONFIGS: BeeConfig[] = [
  { x: -4.0, z: 0.6, phaseX: 0.0, phaseZ: 0.5, speed: 0.5, loopDir: 1 },
  { x: 3.8, z: -0.4, phaseX: 2.2, phaseZ: 1.6, speed: 0.65, loopDir: -1 },
];

// 꿀 흐름 — 키보드 모델 로컬 좌표 (scale 0.3 적용 전)
// 키보드 표면 y ≈ 2, 뒤쪽 z ≈ -4, 앞쪽 z ≈ 4
const STREAM_CONFIGS = [
  { x: -6, zStart: -3, zEnd: 3, width: 0.8, phase: 0, speed: 0.12 },
  { x: 2, zStart: -4, zEnd: 2, width: 0.6, phase: 1.8, speed: 0.1 },
  { x: 7, zStart: -2, zEnd: 4, width: 0.7, phase: 3.2, speed: 0.14 },
];

const PUDDLE_CONFIGS = [
  { x: -6, z: 3.5, size: 2.0, phase: 0.5 },
  { x: 2, z: 2.5, size: 1.6, phase: 2.0 },
  { x: 7, z: 4.5, size: 1.8, phase: 1.2 },
  { x: -1, z: 0, size: 1.2, phase: 3.5 },
];

const LOOP_DURATION = 2.4;
const LOOP_RADIUS_X = 1.8;
const LOOP_RADIUS_Y = 1.0;
const BLEND_SPEED = 3.0;
const BEE_SCALE = 1.4;

// ── 유틸 ──────────────────────────────────────────────────
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const getFloatPos = (config: BeeConfig, elapsed: number) => ({
  x: config.x + Math.sin(elapsed * config.speed + config.phaseX) * 1.0,
  y: 3.5 + Math.sin(elapsed * config.speed * 1.3 + config.phaseZ) * 0.6,
  z: config.z + Math.cos(elapsed * config.speed * 0.9 + config.phaseX) * 0.5,
  rotZ: Math.sin(elapsed * config.speed + config.phaseX) * 0.15,
});

// ── Bee ───────────────────────────────────────────────────
const Bee = ({ config }: { config: BeeConfig }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wingLRef = useRef<THREE.Mesh>(null);
  const wingRRef = useRef<THREE.Mesh>(null);

  const stateRef = useRef<'idle' | 'looping' | 'blending'>('idle');
  const loopProgressRef = useRef(0);
  const loopOriginRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleKeyDown = () => {
      if (stateRef.current !== 'looping') {
        stateRef.current = 'looping';
        loopProgressRef.current = 0;
        if (groupRef.current) {
          loopOriginRef.current = {
            x: groupRef.current.position.x,
            y: groupRef.current.position.y,
            z: groupRef.current.position.z,
          };
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    const target = getFloatPos(config, elapsed);

    const wingSpeed = stateRef.current === 'looping' ? 30 : 20;
    const wingAngle = Math.sin(elapsed * wingSpeed) * 0.4;
    if (wingLRef.current) wingLRef.current.rotation.z = 0.25 + wingAngle;
    if (wingRRef.current) wingRRef.current.rotation.z = -0.25 - wingAngle;

    if (stateRef.current === 'looping') {
      loopProgressRef.current = Math.min(
        1,
        loopProgressRef.current + delta / LOOP_DURATION,
      );

      const eased = easeInOutCubic(loopProgressRef.current);
      const angle = eased * Math.PI * 2 * config.loopDir;

      groupRef.current.position.x =
        loopOriginRef.current.x + Math.sin(angle) * LOOP_RADIUS_X;
      groupRef.current.position.y =
        loopOriginRef.current.y +
        Math.sin(angle) * Math.abs(Math.sin(angle * 0.5)) * LOOP_RADIUS_Y;
      groupRef.current.position.z =
        loopOriginRef.current.z + Math.sin(angle * 2) * 0.35;

      groupRef.current.rotation.z = Math.cos(angle) * 0.3 * config.loopDir;
      groupRef.current.rotation.x = Math.sin(angle * 2) * 0.08;

      if (loopProgressRef.current >= 1) {
        stateRef.current = 'blending';
      }
    } else if (stateRef.current === 'blending') {
      const lerpFactor = 1 - Math.exp(-BLEND_SPEED * delta);
      groupRef.current.position.x +=
        (target.x - groupRef.current.position.x) * lerpFactor;
      groupRef.current.position.y +=
        (target.y - groupRef.current.position.y) * lerpFactor;
      groupRef.current.position.z +=
        (target.z - groupRef.current.position.z) * lerpFactor;
      groupRef.current.rotation.z +=
        (target.rotZ - groupRef.current.rotation.z) * lerpFactor;
      groupRef.current.rotation.x *= 1 - lerpFactor;

      const dx = target.x - groupRef.current.position.x;
      const dy = target.y - groupRef.current.position.y;
      if (Math.abs(dx) < 0.02 && Math.abs(dy) < 0.02) {
        stateRef.current = 'idle';
      }
    } else {
      groupRef.current.position.x = target.x;
      groupRef.current.position.y = target.y;
      groupRef.current.position.z = target.z;
      groupRef.current.rotation.z = target.rotZ;
      groupRef.current.rotation.x = 0;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[config.x, 3.5, config.z]}
      scale={BEE_SCALE}
    >
      <mesh material={MAT_BODY} scale={[0.28, 0.2, 0.18]}>
        <sphereGeometry args={[1, 14, 10]} />
      </mesh>
      <mesh
        material={MAT_STRIPE}
        position={[0.06, 0, 0]}
        scale={[0.06, 0.21, 0.19]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
      <mesh
        material={MAT_STRIPE}
        position={[-0.08, 0, 0]}
        scale={[0.06, 0.21, 0.19]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
      <mesh
        material={MAT_EYE}
        position={[0.2, 0.08, 0.08]}
        scale={[0.04, 0.05, 0.04]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
      <mesh
        material={MAT_EYE}
        position={[0.2, 0.08, -0.08]}
        scale={[0.04, 0.05, 0.04]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
      <mesh
        ref={wingLRef}
        material={MAT_WING}
        position={[0, 0.18, 0.1]}
        scale={[0.18, 0.03, 0.1]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
      <mesh
        ref={wingRRef}
        material={MAT_WING}
        position={[0, 0.18, -0.1]}
        scale={[0.18, 0.03, 0.1]}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </mesh>
    </group>
  );
};

// ── HoneyStream (키보드 위 꿀 줄기) ──────────────────────
const HoneyStream = ({
  config,
}: {
  config: (typeof STREAM_CONFIGS)[number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // 미세하게 좌우 흔들림 + 두께 변화
    meshRef.current.position.x =
      config.x + Math.sin(t * 0.3 + config.phase) * 0.3;
    meshRef.current.scale.x =
      config.width + Math.sin(t * 0.5 + config.phase) * 0.15;
  });

  const length = config.zEnd - config.zStart;
  const centerZ = (config.zStart + config.zEnd) / 2;

  return (
    <mesh
      ref={meshRef}
      material={MAT_HONEY}
      position={[config.x, 2.5, centerZ]}
      rotation={[0, 0, 0]}
      scale={[config.width, 1, 1]}
    >
      <boxGeometry args={[1, 0.3, length]} />
    </mesh>
  );
};

// ── HoneyPuddle (키보드 위 꿀 웅덩이) ───────────────────
const HoneyPuddle = ({
  config,
}: {
  config: (typeof PUDDLE_CONFIGS)[number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // 천천히 맥동하는 웅덩이
    const pulse = 1 + Math.sin(t * 0.4 + config.phase) * 0.08;
    meshRef.current.scale.x = config.size * pulse;
    meshRef.current.scale.z = config.size * pulse * 0.85;
  });

  return (
    <mesh
      ref={meshRef}
      material={MAT_HONEY_THICK}
      position={[config.x, 2.6, config.z]}
      scale={[config.size, 1, config.size * 0.85]}
    >
      <sphereGeometry args={[1, 12, 8]} />
      {/* y를 매우 납작하게 — 위에서 보면 원형 웅덩이 */}
    </mesh>
  );
};

// ── Export ─────────────────────────────────────────────────
export const HoneyOverlay = () => {
  return (
    <>
      {/* 벌 — 월드 좌표 */}
      {BEE_CONFIGS.map((config, i) => (
        <Bee key={i} config={config} />
      ))}

      {/* 꿀 흐름 — 키보드 로컬 좌표 (같은 transform 적용) */}
      <group scale={0.3} rotation={[0.5, 0, 0.015]}>
        {STREAM_CONFIGS.map((config, i) => (
          <HoneyStream key={`s${i}`} config={config} />
        ))}
        {PUDDLE_CONFIGS.map((config, i) => (
          <HoneyPuddle key={`p${i}`} config={config} />
        ))}
      </group>
    </>
  );
};
