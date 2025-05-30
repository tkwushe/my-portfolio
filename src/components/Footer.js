import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/takudzwa-wushe-5a874b30a",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      color: "#0077B5"
    },
    {
      href: "https://github.com/tkwushe",
      icon: <FaGithub />,
      label: "GitHub",
      color: "#333"
    },
    {
      href: "mailto:tk.wushe@gmail.com",
      icon: <FaEnvelope />,
      label: "Email",
      color: "#EA4335"
    }
  ];

  const handleSocialClick = (url, e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer id="footer" className="fade-in">
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleSocialClick(link.href, e)}
            className="social-icon"
            aria-label={link.label}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(17, 18, 20, 0.7)',
              color: '#ffffff',
              fontSize: '1.25rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              margin: '0 10px',
              cursor: 'pointer',
              animationDelay: `${index * 0.1}s`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.backgroundColor = link.color;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = 'rgba(17, 18, 20, 0.7)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            {link.icon}
            <span className="tooltip" style={{
              position: 'absolute',
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              opacity: '0',
              visibility: 'hidden',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}>{link.label}</span>
          </a>
        ))}
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Takudzwa Wushe. All rights reserved.
      </div>
    </footer>
  );
};

export default React.memo(Footer);
