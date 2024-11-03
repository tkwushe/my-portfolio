import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Header = ({ onSetActive }) => {
  const handleNavClick = (article) => {
    console.log('Nav item clicked:', article); // Debug log
    onSetActive(article);
  };

  return (
    <header id="header">
      <div className="logo">
        <span className="icon fa-gem"></span>
      </div>

      <div className="content">
        <div className="inner">
          <h1>Takudzwa Wushe</h1>
          <p>
            A passionate final year Software Engineering student at Anglia Ruskin University, I am keen to apply my knowledge
            and skills in a practical setting. I aspire to utilize technology to enhance educational and socio-economic structures.
            I am excited about the opportunity to bring innovative solutions to a dynamic and evolving software development environment.
            I am confident that a job in software engineering will allow me to make meaningful contributions while further
            developing my technical skills and understanding of the industry.
          </p>
        </div>
      </div>

      <nav>
        <ul>
          <li><a href="#home" onClick={() => handleNavClick('home')}>Home</a></li>
          <li><a href="#projects" onClick={() => handleNavClick('projects')}>Projects</a></li>
          <li><a href="#about" onClick={() => handleNavClick('about')}>About Me</a></li>
          <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
