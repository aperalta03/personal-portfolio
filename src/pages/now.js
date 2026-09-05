import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import DotField from '../components/DotField';
import { now } from '../lib/profile';
import styles from '../styles/Now.module.css';

const Entry = ({ date, body }) => (
  <div className={styles.entry}>
    <span className={styles.date}>{date}</span>
    <span className={styles.body}>{body}</span>
  </div>
);

export default function NowPage() {
  return (
    <>
      <Head>
        <title>Now · Alonso Peralta</title>
        <meta name="description" content="What Alonso is focused on this week, and a few months back." />
      </Head>
      <DotField />
      <section className={`${styles.section} reveal`}>
        <PageHeader title="Now" right={<PageMeta idx={4} label="now" />} />
        <p className={styles.lead}>{now.lead}</p>
        <div className={styles.entries}>
          {now.entries.map((e) => (
            <Entry key={e.date} date={e.date} body={e.body} />
          ))}
          {now.offTheClock ? <Entry date="off the clock" body={now.offTheClock} /> : null}
        </div>
      </section>
    </>
  );
}
