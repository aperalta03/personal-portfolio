import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import DotField from '../components/DotField';
import { resume, identity } from '../lib/profile';
import styles from '../styles/Resume.module.css';

const DownloadButton = () => (
  <a
    className={styles.dlBtn}
    href={identity.resumeUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open ${identity.resumeLabel}`}
  >
    <svg
      className={styles.dlIcon}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <line x1="11" y1="3" x2="11" y2="14" />
      <polyline points="6,10 11,15 16,10" />
      <line x1="3" y1="19" x2="19" y2="19" />
    </svg>
    <span className={styles.tooltip}>{identity.resumeLabel}</span>
  </a>
);

const ExperienceEntry = ({ entry }) => {
  const stacked = entry.roles.length > 1;
  return (
    <div className={styles.orgBlock}>
      <span className={styles.orgYears}>{entry.tenure}</span>
      <div className={styles.orgBody}>
        <h3 className={styles.orgName}>{entry.org}</h3>
        <ul className={`${styles.roleList} ${stacked ? styles.roleListStacked : ''}`}>
          {entry.roles.map((role, j) => (
            <li
              key={j}
              className={`${styles.roleItem} ${j === 0 ? styles.roleCurrent : ''}`}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.roleContent}>
                <div className={styles.roleHead}>
                  <span className={styles.roleTitle}>{role.title}</span>
                  <span className={styles.roleYears}>{role.years}</span>
                </div>
                <div className={styles.roleBlurb}>{role.blurb}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SimpleRow = ({ item }) => (
  <div className={styles.row}>
    <span className={styles.years}>{item.years}</span>
    <div>
      <div className={styles.title}>
        {item.title} <span className={styles.org}>· {item.org}</span>
      </div>
      <div className={styles.blurb}>{item.blurb}</div>
    </div>
  </div>
);

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume · Alonso Peralta</title>
        <meta name="description" content="Resume. Experience, education, study abroad, and stack." />
      </Head>
      <DotField />
      <section className={styles.section}>
        <PageHeader title="Resume" right={<DownloadButton />} />

        <div className={styles.block}>
          <div className={styles.sectionLabel}>── experience</div>
          {resume.experience.map((entry, i) => (
            <ExperienceEntry key={i} entry={entry} />
          ))}
        </div>

        <div className={styles.block}>
          <div className={styles.sectionLabel}>── education</div>
          {resume.education.map((it, i) => (
            <SimpleRow key={i} item={it} />
          ))}
        </div>

        <div className={styles.block}>
          <div className={styles.sectionLabel}>── abroad</div>
          {resume.abroad.map((it, i) => (
            <SimpleRow key={i} item={it} />
          ))}
        </div>

        <div className={styles.stackLabel}>── stack</div>
        <div className={styles.stackGrid}>
          {resume.stack.map((s) => (
            <div key={s.key} className={styles.stackCell}>
              <div className={styles.stackKey}>{s.key}</div>
              <div className={styles.stackValue}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
