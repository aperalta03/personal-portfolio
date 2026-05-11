import { useEffect, useState } from 'react';
import { hero } from '../lib/profile';
import styles from '../styles/IntroSplash.module.css';

const TOTAL_MS = 1700;

const stripAccents = (s) => s.replace(/@@([^@]+)@@/g, '$1');

export default function IntroSplash() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!document.documentElement.classList.contains('intro-splash')) {
      setRemoved(true);
      return;
    }

    const finish = () => {
      document.documentElement.classList.remove('intro-active', 'intro-splash');
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
    document.documentElement.classList.remove('intro-active', 'intro-splash');
    setRemoved(true);
  };

  return (
    <div className={styles.overlay} aria-hidden="true" onClick={onSkip}>
      <div className={styles.topBarSpacer} aria-hidden="true">·</div>
      <section className={styles.heroMirror}>
        <span className={styles.kickerSlot} aria-hidden="true">{hero.kicker}</span>
        <h1 className={styles.headline}>
          {hero.headline[0]}<br />{hero.headline[1]}<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.leadSlot} aria-hidden="true">{stripAccents(hero.lead)}</p>
      </section>
    </div>
  );
}
