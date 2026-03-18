'use client';

import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useEffect, useRef } from 'react';

export default function Home() {
  const splineRef = useRef<Application | null>(null);

  function onLoad(spline: Application) {
    splineRef.current = spline;
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== 'q') return;
      const spline = splineRef.current;
      if (!spline) return;

      const keyQ = spline.findObjectByName('key_Q');
      if (keyQ) keyQ.position.y -= 8;
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== 'q') return;
      const spline = splineRef.current;
      if (!spline) return;

      const keyQ = spline.findObjectByName('key_Q');
      if (keyQ) keyQ.position.y += 8;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <main className="w-full h-screen">
      <Spline
        scene="https://prod.spline.design/kqlzZx4WhdNgALq8/scene.splinecode"
        onLoad={onLoad}
      />
    </main>
  );
}
