import { useEffect, useState } from 'react';

export function useTick({ paused = false } = {}) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (paused) return;
    let raf;
    const start = performance.now();
    const tick = () => {
      setT(performance.now() - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return t;
}
