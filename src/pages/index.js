import Head from 'next/head';
import Link from 'next/link';
import Constellation from '../components/Constellation';
import PageMeta from '../components/PageMeta';
import { hero } from '../lib/profile';
import styles from '../styles/Index.module.css';

const renderLead = (text, link) => {
  if (!link) return text;
  const parts = text.split(/(@@[^@]+@@)/g);
  return parts.map((part, i) => {
    const match = part.match(/^@@([^@]+)@@$/);
    if (!match) return <span key={i}>{part}</span>;
    if (match[1] === link.match) {
      return (
        <Link key={i} href={link.href} className={styles.inlineLink}>
          {match[1]}
        </Link>
      );
    }
    return <span key={i} className={styles.inlineAccent}>{match[1]}</span>;
  });
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Alonso Peralta · AI Software Engineer</title>
        <meta name="description" content="Alonso Peralta. AI software engineer at a stealth startup." />
      </Head>

      <section className={styles.hero}>
        <div className={styles.kicker}>── {hero.kicker}</div>
        <h1 className={styles.headline}>
          {hero.headline[0]}<br />{hero.headline[1]}<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.lead}>{renderLead(hero.lead, hero.leadLink)}</p>
      </section>

      <section className={styles.graph}>
        <div className={styles.graphDots} aria-hidden="true" />
        <div className={styles.graphHead}>
          <h2 className={styles.h2}>
            An orbit of interests<span className={styles.accent}>.</span>
          </h2>
          <PageMeta idx={2} label="map" />
        </div>
        <div className={styles.graphInner}>
          <Constellation />
        </div>
      </section>
    </>
  );
}
