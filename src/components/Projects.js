import React, { useState, useEffect } from 'react';

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
    <div id="main">
      <article id="projects" className={` ${isActive ? 'active' : ''}`}>
        <div className="inner">
          <h2 className="major">Projects</h2>
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
          <div className="close" onClick={onClose}>Close</div>
        </div>
      </article>
    </div>
  );
};

export default Projects;
