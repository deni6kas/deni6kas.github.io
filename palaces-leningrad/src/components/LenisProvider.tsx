'use client';

import { useEffect, useRef } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{
    lenis: { destroy: () => void };
  } | null>(null);

  useEffect(() => {
    let destroy: (() => void) | undefined;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = { lenis };

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      document.documentElement.classList.add('lenis', 'lenis-smooth');

      return () => {
        lenis.destroy();
        document.documentElement.classList.remove('lenis', 'lenis-smooth');
      };
    };

    initLenis().then((d) => {
      destroy = d;
    });

    return () => {
      destroy?.();
    };
  }, []);

  return <>{children}</>;
}
