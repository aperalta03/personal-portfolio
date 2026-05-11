import { useEffect, useState } from 'react';
import styles from '../styles/IntroSplash.module.css';

const STORAGE_KEY = 'intro-played';
const TOTAL_MS = 1700;

export default function IntroSplash() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setRemoved(true);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, '1');

    const timer = setTimeout(() => setRemoved(true), TOTAL_MS);

    const skip = () => {
      clearTimeout(timer);
      setRemoved(true);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') skip();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
      onClick={() => setRemoved(true)}
    >
      <h1 className={styles.headline}>
        Alonso<br />Peralta<span className={styles.accent}>.</span>
      </h1>
      <span className={styles.skipHint}>click or press esc to skip</span>
    </div>
  );
}
