import React, { useState, useEffect } from 'react';
import CloseButton from './CloseButton';

const Projects = ({ isActive, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from the backend API
  useEffect(() => {
    fetch('http://localhost:5001/projects')  // Replace with your backend server URL
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
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error fetching projects: {error.message}</p>;
  }

  return (
    <article id="projects" className={`${isActive ? 'active' : ''} ${isActive ? 'debug-active' : 'debug-inactive'}`}>
      <h2 className="major">Projects</h2>
      <CloseButton onClick={onClose} />
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
            <br />
          </li>
        ))}
      </ul>
     
    </article>
  );
};

export default Projects;
