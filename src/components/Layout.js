import TopBar from './TopBar';
import BottomNav from './BottomNav';
import FilmGrain from './FilmGrain';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <FilmGrain />
      <TopBar />
      <main className={styles.main}>{children}</main>
      <BottomNav />
    </div>
  );
}
