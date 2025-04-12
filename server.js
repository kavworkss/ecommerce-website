const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'desi_drapes' // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes and database operations here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Register a new user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        res.status(500).send('Error registering user');
        throw err;
      }
      res.status(200).send('User registered successfully');
    });
  });
  
// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Internal server error');
      throw err;
    }
    if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});
``

