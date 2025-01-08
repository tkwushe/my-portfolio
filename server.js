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

// Database configuration for MySQL
const pool = mysql.createPool({
  host: 'mysql.railway.internal', // Railway's internal MySQL host
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || 'railway',
  port: parseInt(process.env.MYSQLPORT) || 3306, // MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Convert pool to promise-based API
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    console.log('Attempting database connection with config:', {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT
    });
    
    const [result] = await promisePool.query('SELECT VERSION() as version');
    console.log('Database connected successfully');
    console.log('MySQL Version:', result[0].version);
  } catch (err) {
    console.error('Database connection failed:', {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT
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

// Projects endpoint with error details
app.get('/projects', async (req, res) => {
  console.log('Projects endpoint hit');
  try {
    const [results] = await promisePool.query('SELECT * FROM projects');
    console.log('Projects fetched:', results);
    res.json(results);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ 
      error: 'Database query error',
      details: error.message
    });
  }
});

// Railway injects PORT environment variable
const PORT = process.env.PORT || 8080;

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

