// server.js (Node.js Backend)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware to handle JSON and CORS
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tk',  // Replace with your MySQL user
  password: 'dzanisai',  // Replace with your MySQL password
  database: 'project_portfolio'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Endpoint to fetch all projects
app.get('/projects', (req, res) => {
  const sql = 'SELECT * FROM projects';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Endpoint to fetch all projects
app.get('/projects', (req, res) => {
  const sql = 'SELECT * FROM projects';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});
// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

