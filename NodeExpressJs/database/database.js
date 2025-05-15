require('dotenv').config();
const mysql = require('mysql2');

// First create a connection without specifying a database
const initialConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Create the database if it doesn't exist
initialConnection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    throw err;
  }
  console.log('Connected to MySQL server...');
  
  initialConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    
    console.log(`Database ${process.env.DB_NAME} ensured...`);
    initialConnection.end();
    
    // Now connect to the specific database
    connectToDatabase();
  });
});

function connectToDatabase() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  db.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
    console.log(`Connected to database ${process.env.DB_NAME}...`);
  });
  
  return db;
}

module.exports = connectToDatabase(); 