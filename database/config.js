const mysql = require('mysql2');

// Create a connection to MySQL without specifying a database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

// We'll connect without specifying the database initially
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
  
  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS expense_db', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    
    console.log('Database expense_db ensured...');
    
    // Switch to the expense_db database
    db.query('USE expense_db', (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        throw err;
      }
      console.log('Using expense_db database...');
    });
  });
});

module.exports = db; 