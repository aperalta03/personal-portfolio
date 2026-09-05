import { useEffect, useRef, useState } from 'react';

export function useOrbitTime({ paused = false } = {}) {
  const [t, setT] = useState(0);
  const accumulated = useRef(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    let raf;
    let lastNow = performance.now();
    const tick = (now) => {
      const dt = now - lastNow;
      lastNow = now;
      // Ignore long gaps so backgrounded tabs don't jump on resume.
      if (!pausedRef.current && dt > 0 && dt < 200) {
        accumulated.current += dt;
        setT(accumulated.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return t;
}
