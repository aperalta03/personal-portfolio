import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import FilmGrain from './FilmGrain';
import IntroSplash from './IntroSplash';
import { PROFILE } from '../lib/profile';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const idle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 200);
    const handle = idle(() => {
      PROFILE.nav.forEach((n) => {
        if (n.href !== router.pathname) router.prefetch(n.href);
      });
    });
    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle);
      }
    };
  }, [router]);

  return (
    <div className={styles.shell}>
      <FilmGrain />
      <TopBar />
      <main className={styles.main}>{children}</main>
      <BottomNav />
      <IntroSplash />
    </div>
  );
}
