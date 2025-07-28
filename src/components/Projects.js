import React, { useState, useEffect } from 'react';
import CloseButton from './CloseButton';

const Projects = ({ isActive, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://my-portfolio-production-382d.up.railway.app';

  useEffect(() => {
    if (!isActive) return; // Only fetch when active

    fetch(`${BACKEND_URL}/projects`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch projects`);
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error loading projects. Please try again later.');
        setLoading(false);
      });
  }, [isActive, BACKEND_URL]);
  
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
        const article = document.getElementById('projects');
        if (article) {
          article.scrollTop = 0;
        }
      }, 100);
    }
  }, [isActive]);

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
      {error && <p>{error}</p>}
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
