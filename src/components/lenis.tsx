'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { LenisRef, ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

const Lenis = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.075,
        smoothWheel: true,
        infinite: false,
        anchors: {
          lerp: 0.05,
          easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        },
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Lenis;
