// server.js (Node.js Backend)
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the build directory
app.use(express.static(join(__dirname, 'build')));

// JWT Secret Key (should be in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
// Store hashed password in .env for production
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$XOPbrlUPQdwdJUpSrIFzz.FKNyEFYMQW1jXjUDTdGkGiU1QUwT2aa'; // Hash for 'your-secret-password'

// Log environment variables (excluding sensitive info)
console.log('Environment check:', {
  hasHost: !!process.env.MYSQLHOST,
  hasUser: !!process.env.MYSQLUSER,
  hasPass: !!process.env.MYSQLPASSWORD,
  hasDB: !!process.env.MYSQLDATABASE,
  hasPort: !!process.env.MYSQLPORT,
  port: process.env.PORT
});

// Database configuration with fallbacks
const dbConfig = {
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'mysql.railway.internal',
  user: process.env.MYSQLUSER || process.env.MYSQL_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway',
  port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Update the pool creation with the new config
const pool = mysql.createPool(dbConfig);

// Convert pool to promise-based API
const promisePool = pool.promise();

// Enhanced connection test
const testConnection = async () => {
  try {
    console.log('Database configuration:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port
    });
    
    const [result] = await promisePool.query('SELECT 1 as connection_test');
    if (result[0].connection_test === 1) {
      console.log('Database connection successful');
      
      // Test if projects table exists
      const [tables] = await promisePool.query(`
        SELECT TABLE_NAME 
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = ? 
        AND TABLE_NAME = 'projects'`, 
        [dbConfig.database]
      );
      
      if (tables.length === 0) {
        console.warn('Warning: projects table does not exist');
      } else {
        const [projectCount] = await promisePool.query('SELECT COUNT(*) as count FROM projects');
        console.log(`Found ${projectCount[0].count} projects in database`);
      }
    }
  } catch (err) {
    console.error('Database connection failed:', {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      config: {
        host: dbConfig.host,
        user: dbConfig.user,
        database: dbConfig.database,
        port: dbConfig.port
      }
    });
  }
};

testConnection();

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Token verification endpoint
app.get('/api/verify-token', authenticateToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Compare with admin credentials
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password with stored hash
    const passwordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token
    res.json({
      token,
      user: {
        email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Root route with DB info
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Portfolio API',
    dbConfig: {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT
    }
  });
});

// Health check endpoint with detailed info
app.get('/health', async (req, res) => {
  try {
    await promisePool.query('SELECT 1');
    res.status(200).json({ 
      status: 'healthy',
      database: 'connected',
      config: {
        host: process.env.MYSQLHOST,
        database: process.env.MYSQLDATABASE,
        port: process.env.MYSQLPORT
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      code: error.code
    });
  }
});

// Enhanced projects endpoint
app.get('/projects', async (req, res) => {
  console.log('Projects endpoint hit');
  try {
    // First check if table exists
    const [tables] = await promisePool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'projects'`, 
      [dbConfig.database]
    );

    if (tables.length === 0) {
      console.error('Projects table does not exist');
      return res.status(404).json({ 
        error: 'Projects table not found',
        details: 'Database schema may not be initialized'
      });
    }

    const [results] = await promisePool.query('SELECT * FROM projects');
    console.log('Projects fetched:', {
      count: results.length,
      projects: results
    });
    res.json(results);
  } catch (error) {
    console.error('Query error:', {
      message: error.message,
      code: error.code,
      state: error.sqlState
    });
    res.status(500).json({ 
      error: 'Database query error',
      details: error.message,
      code: error.code
    });
  }
});

// Add new project (protected)
app.post('/projects', authenticateToken, async (req, res) => {
  console.log('Add project endpoint hit');
  const { title, description, github_link, live_link, image_url, category } = req.body;
  
  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  
  try {
    // Check if projects table exists
    const [tables] = await promisePool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'projects'`, 
      [dbConfig.database]
    );

    if (tables.length === 0) {
      // Create projects table if it doesn't exist
      await promisePool.query(`
        CREATE TABLE projects (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          github_link VARCHAR(255),
          live_link VARCHAR(255),
          image_url VARCHAR(255),
          category VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Projects table created');
    }

    // Insert new project
    const [result] = await promisePool.query(
      'INSERT INTO projects (title, description, github_link, live_link, image_url, category) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, github_link, live_link, image_url, category]
    );

    // Get the inserted project
    const [newProject] = await promisePool.query(
      'SELECT * FROM projects WHERE id = ?',
      [result.insertId]
    );

    console.log('Project added:', newProject[0]);
    res.status(201).json(newProject[0]);
  } catch (error) {
    console.error('Add project error:', {
      message: error.message,
      code: error.code,
      state: error.sqlState
    });
    res.status(500).json({ 
      error: 'Failed to add project',
      details: error.message,
      code: error.code
    });
  }
});

// Helper endpoint to generate a bcrypt hash (remove in production)
app.get('/generate-hash/:password', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }
  try {
    const hash = await bcrypt.hash(req.params.password, 10);
    res.json({ hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project (protected)
app.put('/projects/:id', authenticateToken, async (req, res) => {
  console.log('Update project endpoint hit');
  const projectId = req.params.id;
  const { title, description, github_link, live_link, image_url, category } = req.body;
  
  // Validate required fields
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  
  try {
    // Check if projects table exists
    const [tables] = await promisePool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'projects'`, 
      [dbConfig.database]
    );

    if (tables.length === 0) {
      return res.status(404).json({ error: 'Projects table not found' });
    }

    // Check if project exists
    const [existingProject] = await promisePool.query(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );

    if (existingProject.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update project
    await promisePool.query(
      'UPDATE projects SET title = ?, description = ?, github_link = ?, live_link = ?, image_url = ?, category = ? WHERE id = ?',
      [title, description, github_link, live_link, image_url, category, projectId]
    );

    // Get the updated project
    const [updatedProject] = await promisePool.query(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );

    console.log('Project updated:', updatedProject[0]);
    res.json(updatedProject[0]);
  } catch (error) {
    console.error('Update project error:', {
      message: error.message,
      code: error.code,
      state: error.sqlState
    });
    res.status(500).json({ 
      error: 'Failed to update project',
      details: error.message,
      code: error.code
    });
  }
});

// Delete project (protected)
app.delete('/projects/:id', authenticateToken, async (req, res) => {
  console.log('Delete project endpoint hit');
  const projectId = req.params.id;
  
  try {
    // Check if projects table exists
    const [tables] = await promisePool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'projects'`, 
      [dbConfig.database]
    );

    if (tables.length === 0) {
      return res.status(404).json({ error: 'Projects table not found' });
    }

    // Check if project exists
    const [existingProject] = await promisePool.query(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );

    if (existingProject.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete project
    await promisePool.query(
      'DELETE FROM projects WHERE id = ?',
      [projectId]
    );

    console.log('Project deleted:', projectId);
    res.json({ 
      message: 'Project deleted successfully',
      id: projectId 
    });
  } catch (error) {
    console.error('Delete project error:', {
      message: error.message,
      code: error.code,
      state: error.sqlState
    });
    res.status(500).json({ 
      error: 'Failed to delete project',
      details: error.message,
      code: error.code
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server address:', server.address());
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server and DB connections...');
  server.close(async () => {
    await promisePool.end();
    console.log('Database connections closed.');
    process.exit(0);
  });
});

