import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import WorkCard from '../components/WorkCard';
import { work } from '../lib/profile';
import styles from '../styles/Work.module.css';

// Maps "Q1 2026" / "Q1-Q4 2025" / "Q2 2024" to a sortable integer using the
// latest quarter in the range. Higher = more recent.
function dateRank(dateStr) {
  if (!dateStr) return 0;
  const parts = String(dateStr).trim().split(/\s+/);
  const year = parseInt(parts[parts.length - 1], 10) || 0;
  const quarters = (parts[0] || '').match(/Q(\d)/gi) || [];
  const lastQ = quarters.length
    ? parseInt(quarters[quarters.length - 1].slice(1), 10)
    : 1;
  return year * 10 + lastQ;
}

function sortWork(items) {
  return [...items].sort((a, b) => {
    const aImp = a.important ? 1 : 0;
    const bImp = b.important ? 1 : 0;
    if (aImp !== bImp) return bImp - aImp;
    return dateRank(b.date) - dateRank(a.date);
  });
}

export default function WorkPage() {
  const items = sortWork(work.items);
  return (
    <>
      <Head>
        <title>Work · Alonso Peralta</title>
        <meta name="description" content="Projects: ExtractAI, MedGet, PrinterHub, Practice Problem Generator, Headstarter Fellowship." />
      </Head>
      <section className={styles.section}>
        <PageHeader title="Work" right={<PageMeta idx={3} label="work" />} />
        <p className={styles.lead}>{work.lead}</p>
        <div className={styles.grid}>
          {items.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
