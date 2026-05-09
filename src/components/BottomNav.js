import Link from 'next/link';
import { useRouter } from 'next/router';
import { PROFILE } from '../lib/profile';
import styles from '../styles/BottomNav.module.css';

export default function BottomNav() {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul className={styles.links}>
        {PROFILE.nav.map((n) => {
          const active = router.pathname === n.href;
          return (
            <li key={n.key}>
              <Link
                href={n.href}
                className={`${styles.link} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <span className={styles.signature}>a.peralta · {year}</span>
    </nav>
  );
}
