import React, { useState, useEffect } from 'react';
import CloseButton from './CloseButton';

const Projects = ({ isActive, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://my-portfolio-production-382d.up.railway.app';

  useEffect(() => {
    if (!isActive) return; // Only fetch when active

    console.log('Fetching from:', `${BACKEND_URL}/projects`); // Debug log

    fetch(`${BACKEND_URL}/projects`)
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response details:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Debug log
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Detailed error:', error);
        setError(error);
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
      {error && (
        <div className="error-container">
          <p>Error fetching projects: {error.message}</p>
          <p>Backend URL: {BACKEND_URL}</p>
        </div>
      )}
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
