import React, { useEffect } from 'react';
import CloseButton from './CloseButton';

const About = ({ isActive, onClose }) => {
  const skillCategories = {
    "Programming Languages": ["Java", "Python", "C", "JavaScript"],
    "Web Technologies": ["React", "Node.js", "Full-Stack Development"],
    "Database": ["SQL"],
    "Soft Skills": ["Problem-Solving", "Communication", "Teamwork", "Leadership", "Creative Thinking"],
    "Other": ["Technical Expertise", "Open-Source Projects"]
  };

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
      id="about" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">About Me</h2>
      <CloseButton onClick={onClose} />
      <h3>Skills</h3>
      <div className="skills-grid">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h4>{category}</h4>
            <ul>
              {skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>Interests</h3>
      <p>I am passionate about using technology to solve real-world problems, with a particular focus on data
        analytics and machine learning. I'm currently exploring how data-driven insights and intelligent systems
        can lead to innovative, impactful solutions. My interest lies in harnessing the power of data to address
        real challenges—whether it's optimizing processes, improving decision-making, or discovering patterns
        that can lead to meaningful change. I'm particularly interested in how these technologies can be 
        applied to areas like sustainability, finance, and social development, where they can create real,
        tangible benefits.</p>
      <p>Looking ahead, I hope to use these skills to contribute to the growth of technology and innovation in Zimbabwe.
        I believe that leveraging data analytics and machine learning can be instrumental in addressing challenges such 
        as economic development, resource management, and access to essential services in Zimbabwe. My goal is to
        help create data-driven solutions that uplift communities and drive positive change in the country.</p>
    </article>
  );
};

export default React.memo(About);
