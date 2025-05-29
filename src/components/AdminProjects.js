import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaPlus, FaSpinner, FaLock, FaSignOutAlt } from 'react-icons/fa';
import CloseButton from './CloseButton';

// Use environment variables for Supabase credentials
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
    if (error) {
      setMessage({ text: 'Error loading projects.', type: 'error' });
    } else {
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setAuthenticated(true);
        setUserEmail(session.user.email);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (authenticated && isActive) fetchProjects();
  }, [authenticated, isActive]);

  // Handle login with Supabase Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password
    });
    if (error) {
      setMessage({ text: error.message || 'Invalid credentials.', type: 'error' });
      setAuthenticated(false);
      setUserEmail('');
    } else if (data && data.user) {
      setAuthenticated(true);
      setUserEmail(data.user.email);
      setMessage({ text: 'Login successful!', type: 'success' });
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setAuthenticated(false);
    setUserEmail('');
    setAuthForm({ email: '', password: '' });
    setMessage({ text: 'Logged out.', type: 'success' });
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle project submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    const { error } = await supabase.from('projects').insert([formData]);
    if (error) {
      setMessage({ text: 'Failed to add project.', type: 'error' });
    } else {
      setMessage({ text: 'Project added successfully!', type: 'success' });
      setFormData({
        title: '',
        description: '',
        github_link: '',
        live_link: '',
        image_url: '',
        category: 'Web Development'
      });
      fetchProjects();
    }
    setLoading(false);
  };

  return (
    <article id="admin-projects" className={isActive ? 'active' : ''} role="dialog" aria-modal="true">
      <h2 className="major">Admin - Manage Projects</h2>
      <CloseButton onClick={onClose} />
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

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
          <div className="admin-header">
            <span className="admin-welcome">Welcome, {userEmail}</span>
            <button onClick={handleLogout} className="logout-button" disabled={loading}>
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
                <button type="submit" className="submit-button" disabled={loading}>
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
                      <tr key={project.id}>
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
                          {project.live_link && (
                            <>
                              {' | '}
                              <a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="table-link"
                              >
                                Live
                              </a>
                            </>
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