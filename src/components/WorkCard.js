import styles from '../styles/WorkCard.module.css';

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PaperIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <path d="M6 2.5h8L18.5 7v14.5h-13z" />
    <path d="M14 2.5V7h4.5" />
    <path d="M8.5 12h7M8.5 15h7M8.5 18h4.5" />
  </svg>
);

function PaperBadge({ href }) {
  if (!href) return null;
  const label = 'Read research paper';
  return (
    <a
      href={href}
      className={styles.paperBadge}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <PaperIcon />
      <span className={styles.repoTooltip} role="tooltip">{label}</span>
    </a>
  );
}

function RepoBadge({ repo }) {
  if (!repo) return null;
  const isPrivate = !!repo.private;
  const isSoon = !!repo.soon;
  const url = repo.url;
  const defaultLabel = isPrivate
    ? 'Private Repo'
    : url
      ? 'View on GitHub'
      : 'Coming soon';
  const label = repo.label || defaultLabel;
  const muted = isPrivate || isSoon || !url;

  const inner = (
    <>
      <GithubIcon />
      <span className={styles.repoTooltip} role="tooltip">{label}</span>
    </>
  );

  const className = `${styles.repoBadge} ${muted ? styles.repoMuted : ''}`.trim();

  if (url) {
    return (
      <a
        href={url}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {inner}
      </a>
    );
  }

  return (
    <span className={className} aria-label={label} role="img" tabIndex={0}>
      {inner}
    </span>
  );
}

export default function WorkCard({ work, index }) {
  const hue = (index * 23) % 360;
  const thumbStyle = {
    backgroundImage: `repeating-linear-gradient(${hue}deg, rgba(235,232,225,.08), rgba(235,232,225,.08) 1px, transparent 1px, transparent 9px)`,
    backgroundColor: 'rgba(235,232,225,.04)',
  };

  const dateLabel = work.date || work.year;

  return (
    <article id={work.id} className={styles.card}>
      {work.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={work.image} alt={work.title} className={styles.image} />
      ) : (
        <div className={styles.thumb} style={thumbStyle} aria-hidden="true">
          {`{ ${work.id} }`}
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.kind}>{work.kind}</span>
        <span className={styles.date}>{dateLabel}</span>
      </div>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>{work.title}</h3>
        <div className={styles.badges}>
          <PaperBadge href={work.paper} />
          <RepoBadge repo={work.repo} />
        </div>
      </div>
      <p className={styles.blurb}>{work.blurb}</p>
    </article>
  );
}
