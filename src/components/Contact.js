import React, { useEffect } from 'react';
import CloseButton from './CloseButton';

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

  return (
    <article 
      id="contact" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">Contact Me</h2>
      <CloseButton onClick={onClose} />
      <form action="https://formspree.io/f/xwpkkvpv" method="POST">
        <div className="fields">
          <div className="field half">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
        </div>
        <button type="submit" className="primary">Send Message</button>
      </form>
    </article>
  );
};

export default React.memo(Contact);
