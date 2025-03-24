import React, { useState, useEffect, useCallback } from 'react';
import CloseButton from './CloseButton';
import { FaPlus, FaSpinner, FaLock, FaSignOutAlt } from 'react-icons/fa';

const AdminProjects = ({ isActive, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_link: '',
    live_link: '',
    image_url: '',
    category: 'Web Development'
  });

  // For JWT authentication
  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  });
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Configure backend URL
  const RAILWAY_URL = 'https://my-portfolio-production-382d.up.railway.app';
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || RAILWAY_URL;

  // Fetch existing projects - wrapped in useCallback to prevent infinite loops
  const fetchProjects = useCallback(async (currentToken = token) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/projects`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch projects`);
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setMessage({ text: `Error fetching projects`, type: 'error' });
      setError('Could not load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [token, BACKEND_URL]);

  // Check for existing token on component mount or when isActive changes
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setAuthenticated(true);
        // Fetch projects if authenticated and component is active
        if (isActive) {
          fetchProjects(storedToken);
        }
      }
    } catch (err) {
      setError('Authentication error. Please try logging in again.');
    }
  }, [isActive, fetchProjects]);

  // Handle auth form changes
  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm({
      ...authForm,
      [name]: value
    });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authForm.email,
          password: authForm.password
        }),
      });
      
      // Check the content-type of the response
      const contentType = response.headers.get('content-type');
      
      let data;
      
      // If content type is not JSON, handle it specially
      if (!contentType || !contentType.includes('application/json')) {
        // Read as text instead of JSON
        throw new Error(`Login failed. Please check your credentials and try again.`);
      } else {
        // Parse as JSON as normal
        data = await response.json();
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setAuthenticated(true);
      setMessage({ text: 'Authentication successful!', type: 'success' });
      
      // Fetch existing projects
      fetchProjects(data.token);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken('');
    setUser(null);
    setAuthenticated(false);
    setProjects([]);
    setMessage({ text: 'You have been logged out.', type: 'success' });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token might be expired
          setAuthenticated(false);
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
          throw new Error('Session expired. Please login again.');
        }
        
        throw new Error(`Failed to add project`);
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setMessage({ text: 'Project added successfully!', type: 'success' });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        github_link: '',
        live_link: '',
        image_url: '',
        category: 'Web Development'
      });
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
      setError('Could not add project. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle escape key
  React.useEffect(() => {
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
      id="admin-projects" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <h2 className="major">Admin - Manage Projects</h2>
      <CloseButton onClick={onClose} />

      {/* Error display */}
      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {/* Message display */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {!authenticated ? (
        <div className="admin-login-container">
          <h3>Login Required <FaLock /></h3>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <><FaSpinner className="spin" /> Logging in...</> : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-container">
          <div className="admin-header">
            <span className="admin-welcome">Welcome, {user?.email}</span>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </div>
          
          <div className="admin-form">
            <h3>Add New Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="fields">
                <div className="field">
                  <label htmlFor="title">Project Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Project Title"
                    required
                  />
                </div>
                
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project Description"
                    rows="4"
                    required
                  />
                </div>
                
                <div className="field half">
                  <label htmlFor="github_link">GitHub Link</label>
                  <input
                    type="url"
                    id="github_link"
                    name="github_link"
                    value={formData.github_link}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                
                <div className="field half">
                  <label htmlFor="live_link">Live Demo Link (optional)</label>
                  <input
                    type="url"
                    id="live_link"
                    name="live_link"
                    value={formData.live_link}
                    onChange={handleChange}
                    placeholder="https://your-project.com"
                  />
                </div>
                
                <div className="field">
                  <label htmlFor="image_url">Image URL (optional)</label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://image-host.com/your-image.jpg"
                  />
                </div>
                
                <div className="field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? <><FaSpinner className="spin" /> Saving...</> : <><FaPlus /> Add Project</>}
                </button>
              </div>
            </form>
          </div>
          
          <div className="admin-projects-list">
            <h3>Existing Projects ({projects.length})</h3>
            {loading && <p className="loading"><FaSpinner className="spin" /> Loading projects...</p>}
            
            {projects.length > 0 ? (
              <div className="projects-table-container">
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id || project._id}>
                        <td>{project.title}</td>
                        <td className="description-cell">{project.description?.substring(0, 50)}...</td>
                        <td>
                          {project.github_link && (
                            <a 
                              href={project.github_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="table-link"
                            >
                              GitHub
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default React.memo(AdminProjects); 