import React from 'react';
import CloseButton from './CloseButton';

const Contact = ({ isActive, onClose }) => {
  return (
    <article id="contact" className={isActive ? 'active' : ''}>
      <h2 className="major">Contact Me</h2>
      <CloseButton onClick={onClose} />
      <form action="https://formspree.io/f/xwpkkvpv" method="POST">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </article>
  );
};

export default Contact;
