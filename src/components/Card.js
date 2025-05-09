import React, { useState, useRef} from 'react';
import styles from '../styles/Card.module.css';

const Card = ({
  name,
  position,
  aboutMe,
  linkedin,
  github,
  cvLink,
  profileImage,
}) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (y < centerY) {
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            setRotation({ x: rotateX, y: rotateY });
        } else {
            setRotation({ x: 0, y: 0 }); 
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.cardContainer}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                className={styles.card}
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
                >
                    <div className={styles.content}> 
                        <div className={styles.description}>
                            <h1>{name}</h1>
                            <h2>{position}</h2>
                            <p>{aboutMe}</p>
                            <div className={styles.icons}>
                                <a href={linkedin} className={styles.hoverText} target="_blank" rel="noopener noreferrer">
                                    <span className={styles.tooltipText}>LinkedIn</span>
                                    <i className="bi bi-linkedin" />
                                </a>
                                <a href={github} className={styles.hoverText} target="_blank" rel="noopener noreferrer">
                                    <span className={styles.tooltipText}>GitHub</span>
                                    <i className="bi bi-github" />
                                </a>
                                <a href={cvLink} className={styles.hoverText} target="_blank" rel="noopener noreferrer">
                                    <span className={styles.tooltipText}>Resume</span>
                                    <i className="bi bi-file-earmark-arrow-down" />
                                </a>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <img src={profileImage} alt={name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Card;