'use client';

import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useKeyboardInput } from '../hooks/useKeyboardInput';

const SCENE_URL =
  'https://prod.spline.design/kqlzZx4WhdNgALq8/scene.splinecode';

export const BaseKeyboard = () => {
  const splineRef = useRef<Application | null>(null);

  useKeyboardInput(splineRef);

  return (
    <div className="w-full relative overflow-hidden z-10 pointer-events-none">
      <Spline
        scene={SCENE_URL}
        onLoad={(spline) => {
          splineRef.current = spline;
          const kb = spline.findObjectByName('keyboard');
          if (kb) {
            kb.scale.x = 8;
            kb.scale.y = 8;
            kb.scale.z = 8;
          }
        }}
        className="pointer-events-none !absolute !inset-0"
      />
    </div>
  );
};
