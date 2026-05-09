import styles from '../styles/PageHeader.module.css';

export default function PageHeader({ title, right }) {
  return (
    <div className={styles.row}>
      <h1 className={styles.h1}>
        {title}
        <span className={styles.accent}>.</span>
      </h1>
      {right ? <div className={styles.right}>{right}</div> : null}
    </div>
  );
}
