import React from 'react';

const Home =({ isActive , onClose}) => (
<div id="main">
  <article id="home"className={`article ${isActive ? 'active' : ''}`}>
    <h1>Welcome to My Portfolio</h1>
    <p>Hi, I'm Takudzwa Wushe, a software engineer.</p>
    <p>As a  final year Software Engineering student at Anglia Ruskin University, I have developed a robust foundation in both procedural and object-oriented programming. My technical skills, coupled with my passion for digital innovation, make me a strong
     candidate for various roles in the tech industry.</p>
     <div className="close" onClick={onClose}>Close</div>
  </article>
  </div>
  
);

export default Home;