import { useEffect, useState } from 'react';
import styles from '../styles/PageLoader.module.css';

const TOTAL_MS = 1700;

export default function PageLoader() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!document.documentElement.classList.contains('intro-bar')) {
      setRemoved(true);
      return;
    }

    const finish = () => {
      document.documentElement.classList.remove('intro-active', 'intro-bar');
      setRemoved(true);
    };
    const timer = setTimeout(finish, TOTAL_MS);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        clearTimeout(timer);
        finish();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (removed) return null;

  const onSkip = () => {
    document.documentElement.classList.remove('intro-active', 'intro-bar');
    setRemoved(true);
  };

  return (
    <div className={styles.overlay} aria-hidden="true" onClick={onSkip}>
      <div className={styles.barTrack}>
        <div className={styles.barHead} />
      </div>
    </div>
  );
}
