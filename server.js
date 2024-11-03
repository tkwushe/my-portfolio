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

// Database configuration
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState
    });
    return;
  }
  console.log('Database connected successfully');
  connection.release();
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
    const connection = await pool.promise().getConnection();
    await connection.query('SELECT 1');
    connection.release();
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
    // Test connection first
    const connection = await pool.promise().getConnection();
    console.log('Connection successful');

    // Show available tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Available tables:', tables);

    // Try to get projects
    const [rows] = await connection.query('SELECT * FROM projects');
    console.log('Projects fetched:', rows);
    
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      state: error.sqlState,
      errno: error.errno,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Database error',
      details: error.message,
      code: error.code
    });
  }
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server and DB connections...');
  server.close(() => {
    pool.end(() => {
      console.log('Database connections closed.');
      process.exit(0);
    });
  });
});

