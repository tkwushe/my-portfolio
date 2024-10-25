import React from 'react';
import CloseButton from './CloseButton';
import profileImage from '../images/profile.jpg'; // Make sure this path is correct

const Home = ({ isActive, onClose }) => {
  return (
    <article id="home" className={isActive ? 'active' : ''}>
      <h2 className="major">Home</h2>
      <CloseButton onClick={onClose} />
      <span className="image main">
        <img src={profileImage} alt="Takudzwa Wushe" />
      </span>
      <p>Hi, I'm Takudzwa Wushe, a software engineer.</p>
      <p>As a final year Software Engineering student at Anglia Ruskin University, I have developed a robust foundation in both procedural and object-oriented programming. My technical skills, coupled with my passion for digital innovation, make me a strong candidate for various roles in the tech industry.</p>
    
      {/* Debug info */}
      <div style={{position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.7)', color: 'black', padding: '5px'}}>
        isActive: {isActive.toString()}
      </div>
    </article>
  );
};

export default Home;
