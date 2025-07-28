import React, { useEffect } from 'react';
import CloseButton from './CloseButton';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = ({ isActive, onClose }) => {
  // Handle escape key
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
        const article = document.getElementById('contact');
        if (article) {
          article.scrollTop = 0;
        }
      }, 100);
    }
  }, [isActive]);

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'tk.wushe@gmail.com',
      link: 'mailto:tk.wushe@gmail.com'
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'Takudzwa Wushe',
      link: 'https://www.linkedin.com/in/takudzwa-wushe-5a874b30a'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: '@tkwushe',
      link: 'https://github.com/tkwushe'
    }
  ];

  return (
    <article 
      id="contact" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">Contact Me</h2>
      <CloseButton onClick={onClose} />
      
      <div className="contact-grid">
        <div className="contact-form">
          <h3>Send a Message</h3>
          <form action="https://formspree.io/f/xwpkkvpv" method="POST">
            <div className="fields">
              <div className="field half">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="field half">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Your email" />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" required placeholder="Your message"></textarea>
              </div>
            </div>
            <button type="submit" className="primary">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Other Ways to Connect</h3>
          <div className="contact-methods">
            {contactMethods.map((method, index) => (
              <a 
                key={method.title}
                href={method.link}
                className="contact-method"
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="icon">{method.icon}</span>
                <div className="contact-details">
                  <h4>{method.title}</h4>
                  <p>{method.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(Contact);
