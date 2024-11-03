import React, { useState, useEffect } from 'react';
import CloseButton from './CloseButton';

const Projects = ({ isActive, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isActive) return; // Only fetch when active

    fetch('http://localhost:5001/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setError(error);
        setLoading(false);
      });
  }, [isActive]);

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
      id="projects" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">Projects</h2>
      <CloseButton onClick={onClose} />
      {loading && <p>Loading projects...</p>}
      {error && <p>Error fetching projects: {error.message}</p>}
      {!loading && !error && (
        <ul>
          {projects.map((project, index) => (
            <li key={project.id || index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a 
                href={project.github_link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <br />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default React.memo(Projects);
