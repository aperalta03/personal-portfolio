import { useState } from 'react';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import { identity, contact, links } from '../lib/profile';
import styles from '../styles/Contact.module.css';

export default function ContactPage() {
  const sideLinks = links.filter((l) => l.label !== 'email');
  const [copied, setCopied] = useState(false);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(identity.email)}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(identity.email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Contact · Alonso Peralta</title>
        <meta name="description" content="Get in touch with Alonso Peralta." />
      </Head>
      <section className={`${styles.section} reveal`}>
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
          <div className={styles.emailFallback}>
            <a
              className={styles.emailFallbackLink}
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Gmail
            </a>
            <span aria-hidden="true" className={styles.emailFallbackSep}>·</span>
            <button
              type="button"
              className={styles.emailFallbackLink}
              onClick={handleCopy}
              aria-live="polite"
            >
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>
        <div className={styles.links}>
          {sideLinks.map((l) => {
            const newTab = l.href.startsWith('http') || l.href.endsWith('.pdf');
            return (
              <div key={l.label} className={styles.linkCell}>
                <span className={styles.linkKey}>{l.label}</span>
                <a
                  href={l.href}
                  className={styles.linkValue}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                >
                  {l.hint}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
