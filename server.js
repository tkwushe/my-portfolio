// server.js (Node.js Backend)
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 8080;

// Force IPv4
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

