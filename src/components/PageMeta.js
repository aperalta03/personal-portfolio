import styles from '../styles/PageMeta.module.css';

export default function PageMeta({ idx, label, total = 6 }) {
  const padded = String(idx).padStart(2, '0');
  return (
    <span className={styles.meta} aria-label={`page ${idx} of ${total}`}>
      {padded} / {label}
    </span>
  );
}
