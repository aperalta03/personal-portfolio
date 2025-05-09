import React from 'react';
import Card from '../components/Card';

export default function Home() {
    return (
        <Card
            name = "Alonso Peralta"
            position = "Software Engineer"
            aboutMe =  {
                `Hi there! I'm Alonso Peralta, an aspiring software engineer passionate about crafting efficient and user-friendly tools for business and clients. 
                With ~2 years of experience, I specialize in Full Stack Development and AI/ML using Python, JavaScript, and frameworks like React.
                I thrive on creating client-centric enviroments and optimizing performance for speedy and secure experiences. Contact me for opportunities!`
            }
            linkedin="https://www.linkedin.com/in/aperalta03"
            github="https://github.com/aperalta03"
            cvLink="/files/resume.pdf"
            profileImage="/images/profile.webp"
        />
    )
}