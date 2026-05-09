import { useEffect, useRef, useState } from 'react';

export function useOrbitTime({ paused = false } = {}) {
  const [t, setT] = useState(0);
  const accumulated = useRef(0);

  useEffect(() => {
    if (paused) return;
    let raf;
    let lastNow = performance.now();
    const tick = (now) => {
      accumulated.current += now - lastNow;
      lastNow = now;
      setT(accumulated.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return t;
}
