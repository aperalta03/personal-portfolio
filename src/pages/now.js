import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import DotField from '../components/DotField';
import { now } from '../lib/profile';
import styles from '../styles/Now.module.css';

export default function NowPage() {
  return (
    <>
      <Head>
        <title>Now · Alonso Peralta</title>
        <meta name="description" content="What Alonso is focused on this week, and a few months back." />
      </Head>
      <DotField />
      <section className={styles.section}>
        <PageHeader title="Now" right={<PageMeta idx={4} label="now" />} />
        <p className={styles.lead}>{now.lead}</p>
        <div className={styles.entries}>
          {now.entries.map((e) => (
            <div key={e.date} className={styles.entry}>
              <span className={styles.date}>{e.date}</span>
              <span className={styles.body}>{e.body}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
