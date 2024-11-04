import React from 'react';

const Footer = () => (
  <footer id="footer" className="fade-in">
    <ul className="icons">
      <li>
        <a 
          href="www.linkedin.com/in/takudzwa-wushe-5a874b30a" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon brands fa-linkedin"
        >
          <span className="label">LinkedIn</span>
        </a>
      </li>
      <li>
        <a 
          href="https://github.com/tkwushe" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon brands fa-github"
        >
          <span className="label">GitHub</span>
        </a>
      </li>
      <li>
        <a 
          href="mailto:tk.wushe@gmail.com" 
          className="icon solid fa-envelope"
        >
          <span className="label">Email</span>
        </a>
      </li>
    </ul>
  </footer>
);

export default React.memo(Footer);
