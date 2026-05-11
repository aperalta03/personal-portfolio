import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import DotField from '../components/DotField';
import { about } from '../lib/profile';
import styles from '../styles/About.module.css';

const renderInlineAccent = (text) => {
  const parts = text.split(/(@@[^@]+@@)/g);
  return parts.map((part, i) => {
    const match = part.match(/^@@([^@]+)@@$/);
    if (match) return <span key={i} className={styles.inlineAccent}>{match[1]}</span>;
    return <span key={i}>{part}</span>;
  });
};

export default function AboutPage() {
  const [first, ...rest] = about.paragraphs;
  return (
    <>
      <Head>
        <title>About · Alonso Peralta</title>
        <meta name="description" content="About Alonso Peralta. AI software engineer at a stealth startup; Texas A&M senior." />
      </Head>
      <DotField />
      <section className={`${styles.section} reveal`}>
        <PageHeader title="About" right={<PageMeta idx={2} label="about" />} />
        <div className={styles.prose}>
          <p className={styles.firstPara}>
            <span className={styles.dropCap}>I</span>
            {renderInlineAccent(first)}
          </p>
          {rest.map((para, i) => (
            <p key={i}>{renderInlineAccent(para)}</p>
          ))}
        </div>
        <dl className={styles.meta}>
          {about.meta.map((x) => (
            <div key={x.key} className={styles.metaCell}>
              <dt className={styles.metaKey}>{x.key}</dt>
              <dd className={styles.metaValue}>{x.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
