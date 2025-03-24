import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';

const Header = ({ onSetActive }) => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Check for admin hash in URL and listen for keyboard shortcut
  useEffect(() => {
    // Check if URL hash is #admin
    const checkHashAndUpdate = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      }
    };
    
    // Initial check
    checkHashAndUpdate();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHashAndUpdate);
    
    // Listen for keyboard shortcut (Ctrl+Shift+A)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHashAndUpdate);
    };
  }, []);

  const handleNavClick = (article) => {
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
          {showAdmin && (
            <li className="admin-nav-item">
              <a href="#admin" onClick={() => handleNavClick('admin')}>
                <FaLock /> Admin
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
