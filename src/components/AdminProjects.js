import React, { useState, useEffect } from 'react';
import { FaPlus, FaSpinner, FaLock, FaSignOutAlt, FaTrash, FaEdit } from 'react-icons/fa';
import CloseButton from './CloseButton';

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
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  // Use the same backend URL as Projects component
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (
    process.env.NODE_ENV === 'production' 
      ? 'https://my-portfolio-production-382d.up.railway.app'
      : 'http://localhost:9000'
  );

  // Fetch projects from Express backend
  const fetchProjects = async () => {
    if (!authenticated) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${BACKEND_URL}/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
      setMessage({ text: '', type: '' });
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMessage({ text: 'Error loading projects.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      const email = localStorage.getItem('admin_email');
      
      if (token && email) {
        // Verify token is still valid
        fetch(`${BACKEND_URL}/api/verify-token`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            setAuthenticated(true);
            setUserEmail(email);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_email');
          }
        })
        .catch(() => {
          // Error verifying token, clear storage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
        });
      }
    };
    
    checkAuth();
  }, [BACKEND_URL]);

  useEffect(() => {
    if (authenticated && isActive) {
      fetchProjects();
    }
  }, [authenticated, isActive]);

  // Handle login with Express backend
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authForm.email,
          password: authForm.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user info
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_email', data.user.email);
      
      setAuthenticated(true);
      setUserEmail(data.user.email);
      setMessage({ text: 'Login successful!', type: 'success' });
      
      // Clear form
      setAuthForm({ email: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ text: error.message || 'Invalid credentials.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setAuthenticated(false);
    setUserEmail('');
    setAuthForm({ email: '', password: '' });
    setMessage({ text: 'Logged out.', type: 'success' });
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      github_link: '',
      live_link: '',
      image_url: '',
      category: 'Web Development'
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle project submission (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('admin_token');
      const url = editingProject 
        ? `${BACKEND_URL}/projects/${editingProject.id}`
        : `${BACKEND_URL}/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${editingProject ? 'update' : 'add'} project`);
      }

      setMessage({ 
        text: `Project ${editingProject ? 'updated' : 'added'} successfully!`, 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        github_link: '',
        live_link: '',
        image_url: '',
        category: 'Web Development'
      });
      setEditingProject(null);
      
      // Refresh projects list
      fetchProjects();
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({ 
        text: error.message || `Failed to ${editingProject ? 'update' : 'add'} project.`, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle project deletion
  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${BACKEND_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete project');
      }

      setMessage({ text: 'Project deleted successfully!', type: 'success' });
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ text: error.message || 'Failed to delete project.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit project
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      github_link: project.github_link || '',
      live_link: project.live_link || '',
      image_url: project.image_url || '',
      category: project.category || 'Web Development'
    });
    
    // Scroll to form
    document.querySelector('.admin-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      github_link: '',
      live_link: '',
      image_url: '',
      category: 'Web Development'
    });
  };

  return (
    <article id="admin-projects" className={isActive ? 'active' : ''} role="dialog" aria-modal="true">
      <h2 className="major">Admin - Manage Projects</h2>
      <CloseButton onClick={onClose} />
      
      {message.text && (
        <div className={`message ${message.type}`} style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '4px',
          backgroundColor: message.type === 'error' ? '#ff4444' : '#44ff44',
          color: message.type === 'error' ? '#fff' : '#000'
        }}>
          {message.text}
        </div>
      )}

      {!authenticated ? (
        <div className="admin-login-container">
          <h3>Admin Login <FaLock /></h3>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={authForm.email}
                onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                placeholder="Enter admin email"
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
                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
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
          <div className="admin-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
            <span className="admin-welcome">Welcome, {userEmail}</span>
            <button onClick={handleLogout} className="logout-button" disabled={loading}>
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="admin-form">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            {editingProject && (
              <div style={{ marginBottom: '1rem' }}>
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    color: '#ccc',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Edit
                </button>
              </div>
            )}
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
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? (
                    <><FaSpinner className="spin" /> {editingProject ? 'Updating...' : 'Saving...'}</>
                  ) : (
                    <><FaPlus /> {editingProject ? 'Update Project' : 'Add Project'}</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="projects-list" style={{ marginTop: '2rem' }}>
            <h3>Existing Projects ({projects.length})</h3>
            {loading && projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaSpinner className="spin" /> Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                No projects found. Add your first project above.
              </p>
            ) : (
              <div className="projects-grid" style={{
                display: 'grid',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="project-item"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#64ffda' }}>{project.title}</h4>
                        <p style={{ margin: '0 0 0.5rem 0', color: '#ccc', fontSize: '0.9rem' }}>
                          {project.description?.substring(0, 100)}
                          {project.description?.length > 100 ? '...' : ''}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'rgba(127, 90, 240, 0.2)',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            color: '#7f5af0'
                          }}>
                            {project.category}
                          </span>
                          {project.github_link && (
                            <a 
                              href={project.github_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#64ffda', fontSize: '0.75rem' }}
                            >
                              GitHub
                            </a>
                          )}
                          {project.live_link && (
                            <a 
                              href={project.live_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#64ffda', fontSize: '0.75rem' }}
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                        <button
                          onClick={() => handleEdit(project)}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #64ffda',
                            borderRadius: '4px',
                            color: '#64ffda',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Edit project"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #ff4444',
                            borderRadius: '4px',
                            color: '#ff4444',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Delete project"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default AdminProjects;