import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import { identity, contact, links } from '../lib/profile';
import styles from '../styles/Contact.module.css';

export default function ContactPage() {
  const sideLinks = links.filter((l) => l.label !== 'email');

  return (
    <>
      <Head>
        <title>Contact · Alonso Peralta</title>
        <meta name="description" content="Get in touch with Alonso Peralta." />
      </Head>
      <section className={styles.section}>
        <PageHeader title="Say hi" right={<PageMeta idx={6} label="contact" />} />
        <div className={styles.body}>
          <p className={styles.lead}>{contact.lead}</p>
          <a
            className={styles.emailBtn}
            href={`mailto:${identity.email}`}
            aria-label={contact.buttonAriaLabel}
          >
            <svg
              className={styles.emailIcon}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" />
              <polyline points="3,7 12,13 21,7" />
            </svg>
            <span>{contact.buttonLabel}</span>
          </a>
        </div>
        <div className={styles.links}>
          {sideLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={styles.linkCell}
              target={l.href.startsWith('http') || l.href.endsWith('.pdf') ? '_blank' : undefined}
              rel={l.href.startsWith('http') || l.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.linkKey}>{l.label}</span>
              <span className={styles.linkValue}>{l.hint}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
