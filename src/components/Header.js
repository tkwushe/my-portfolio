import React, { useState, useEffect } from 'react';

const Header = ({ onSetActive }) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    //timer to hide the intro  10 seconds 
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 10000); 

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <header id="header">
      <div className="logo">
        <span className="icon fa-gem"></span>
      </div>

      {showIntro && (
        <div className="content">
          <div className="inner">
            <h1>Takudzwa Wushe</h1>
            <p>
              A passionate second-year Software Engineering student at Anglia Ruskin University, I am keen to apply my knowledge
              and skills in a practical setting. I aspire to utilize technology to enhance educational and socio-economic structures.
              I am excited about the opportunity to bring innovative solutions to a dynamic and evolving software development environment.
              I am confident that a placement in software engineering will allow me to make meaningful contributions while further
              developing my technical skills and understanding of the industry.
            </p>
          </div>
        </div>
      )}

      <nav>
        <ul>
          <li><a href="#home" onClick={() => onSetActive('home')}>Home</a></li>
          <li><a href="#projects" onClick={() => onSetActive('projects')}>Projects</a></li>
          <li><a href="#about" onClick={() => onSetActive('about')}>About Me</a></li>
          <li><a href="#contact" onClick={() => onSetActive('contact')}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
