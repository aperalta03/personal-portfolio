import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({
  name,
  position,
  aboutMe,
  linkedin,
  github,
  cvLink,
  profileImage,
}) => (
    <div className={styles.container}>
        <div className={styles['card-container']}>
            <div className={styles.description}>
                {/* Description */}
                <h1>{name}</h1>
                <h2>{position}</h2>
                <p>{aboutMe}</p>
                {/* Icons */}
                <div className={styles.icons}>
                    <a href={linkedin} className={styles['hover-text']} target="_blank" rel="noopener noreferrer">
                        <span className={styles['tooltip-text']}>LinkedIn</span>
                        <i className="bi bi-linkedin" />
                    </a>
                    <a href={github} className={styles['hover-text']} target="_blank" rel="noopener noreferrer">
                        <span className={styles['tooltip-text']}>GitHub</span>
                        <i className="bi bi-github" />
                    </a>
                    <a href={cvLink} className={styles['hover-text']} target="_blank" rel="noopener noreferrer">
                        <span className={styles['tooltip-text']}>Resume</span>
                        <i className="bi bi-file-earmark-arrow-down" />
                    </a>
                </div>
            </div>
            {/* Image */}
            <div className={styles.image}>
                <img src={profileImage} alt={name} />
            </div>
        </div>
    </div>
);

export default Card;