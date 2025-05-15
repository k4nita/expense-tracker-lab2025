require('dotenv').config();
const mysql = require('mysql2');

let dbInstance = null;

function getDbConnection() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  dbInstance.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
    console.log(`Connected to database ${process.env.DB_NAME}...`);
  });

  return dbInstance;
}

module.exports = { getDbConnection }; 