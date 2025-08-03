import React, { useEffect } from 'react';
import CloseButton from './CloseButton';
import profileImage from '../images/profile.jpg';

const Home = ({ isActive, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isActive) {
        onClose();
      }
    };

    if (isActive) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isActive, onClose]);

  // Scroll to top when article becomes active
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        const article = document.getElementById('home');
        if (article) {
          article.scrollTop = 0;
        }
      }, 100);
    }
  }, [isActive]);

  return (
    <article 
      id="home" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">Home</h2>
      <CloseButton onClick={onClose} />
      <span className="image main">
        <img src={profileImage} alt="Takudzwa Wushe" />
      </span>

      <p>Hi, I'm Takudzwa Wushe, a software engineer.</p>
      <p>As a Software Engineering graduate from Anglia Ruskin University with First Class Honours, I have built a strong foundation in both procedural and object-oriented programming. My technical skills, coupled with my passion for digital innovation, make me a strong candidate for various roles in the tech industry.</p>
      
      <h3>Professional Experience</h3>
      <h4>Software Development Intern - Tano Digital, Zimbabwe</h4>
      <p className="date">February 2022 - August 2022</p>
      <ul>
        <li>Developed full-stack web applications using Python and Django</li>
        <li>Contributed to software tool development and refinement</li>
        <li>Gained comprehensive understanding of the software development lifecycle</li>
      </ul>
      
      <h3>Education</h3>
      <h4>BSc Software Engineering - First Class Honours</h4>
      <p>Anglia Ruskin University, UK (2022-2025)</p>
      
      <div className="grades">
        <h4>Key Modules and Achievements:</h4>
        <ul>
          <li><strong>Algorithm Analysis and Data Structures:</strong> Grade A (82%) - Mastered complex algorithms and efficient data structure implementation</li>
          <li><strong>Computer Systems:</strong> Grade A (86%) - Mastered hardware-software integration principles</li>
          <li><strong>Operating Systems:</strong> Grade A (87%) - Specialised in system processes and resource management</li>
          <li><strong>Software Principles:</strong> Grade A (77%) - Applied theoretical concepts to practical computing challenges</li>
          <li><strong>Core Mathematics for Computing:</strong> Grade A (85%) - Developed strong analytical and problem-solving skills</li>
          <li><strong>Database Design:</strong> Grade A (75%) - Proficient in database architecture and implementation</li>
          <li><strong>Object-Oriented Programming:</strong> Grade A (70%) - Expert in modular and reusable code development</li>
        </ul>
      </div>

      <div className="previous-education">
        <h4>St. Georges Senior School, Zimbabwe (2016-2021)</h4>
        <p>A Levels</p>
      </div>

      <p className="summary">
        I am a dedicated software engineering graduate with First Class Honours and a proven track record of academic excellence 
        and practical experience in software development. My combination of strong technical skills and 
        professional experience positions me well for roles in software engineering.
      </p>
    </article>
  );
};

export default React.memo(Home);
