import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

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

  return (
    <footer id="footer" className="fade-in">
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={link.label}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {link.icon}
            <span className="tooltip">{link.label}</span>
          </a>
        ))}
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Takudzwa Wushe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
