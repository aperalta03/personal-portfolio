import React from 'react';
import Card from '../components/Card';

export default function Home() {
    return (
        <Card
            name = "Alonso Peralta"
            position = "Software Engineer"
            aboutMe = {`Hi there! I'm Alonso Peralta, a seasoned web developer passionate about crafting clean and dynamic websites. With 5 years of experience, I specialize in front-end and back-end development using HTML, CSS, JavaScript, and frameworks like React and Angular.

            I thrive on creating user-centric designs and optimizing performance for seamless browsing experiences. Let's collaborate TOGETHER!`}

            linkedin="https://www.linkedin.com/in/aperalta03"
            github="https://github.com/aperalta03"
            cvLink="/files/resume.pdf"
            profileImage="/images/profile.webp"
        />
    )
}