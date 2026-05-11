import Link from 'next/link';
import { useRouter } from 'next/router';
import { identity } from '../lib/profile';
import styles from '../styles/TopBar.module.css';

const keyFromPath = (pathname) => (pathname === '/' ? 'index' : pathname.replace(/^\//, ''));

export default function TopBar() {
  const router = useRouter();
  const currentKey = keyFromPath(router.pathname);
  const year = new Date().getFullYear();

  return (
    <header className={`${styles.bar} revealDown`}>
      <Link href="/" className={styles.crumb}>
        {identity.displayName} · <span className={styles.accent}>{currentKey}</span>
      </Link>
      <span className={styles.locale}>{identity.locale} · {year}</span>
    </header>
  );
}
