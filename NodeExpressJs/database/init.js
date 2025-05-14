const mysql = require('mysql2');

// Function to initialize the database
const initializeDatabase = () => {
  // Create connection without database to first create it if needed
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  // Create the database if it doesn't exist
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err) => {
      if (err) {
        console.error('Error creating database:', err);
        process.exit(1);
      }
      
      // Connect to the database to create tables
      connection.query(`USE ${process.env.DB_NAME}`, (err) => {
        if (err) {
          console.error('Error using database:', err);
          process.exit(1);
        }
        
        // Create categories table
        const createCategoriesTable = `
          CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            type ENUM('expense', 'income') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;
        
        // Create expenses table
        const createExpensesTable = `
          CREATE TABLE IF NOT EXISTS expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255),
            date DATE NOT NULL,
            category_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
          )
        `;
        
        // Create income table
        const createIncomeTable = `
          CREATE TABLE IF NOT EXISTS income (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255),
            date DATE NOT NULL,
            category_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
          )
        `;
        
        // Create users table
        const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;
        
        // Create budgets table
        const createBudgetsTable = `
          CREATE TABLE IF NOT EXISTS budgets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_id INT,
            amount DECIMAL(10, 2) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
          )
        `;

        // Add default categories
        const insertDefaultCategories = `
          INSERT IGNORE INTO categories (name, type) VALUES 
          ('Food', 'expense'),
          ('Transportation', 'expense'),
          ('Housing', 'expense'),
          ('Utilities', 'expense'),
          ('Entertainment', 'expense'),
          ('Healthcare', 'expense'),
          ('Salary', 'income'),
          ('Freelance', 'income'),
          ('Investments', 'income'),
          ('Gifts', 'income')
        `;
        
        // Execute all table creation queries
        connection.query(createCategoriesTable, (err) => {
          if (err) console.error('Error creating categories table:', err);
          
          connection.query(createExpensesTable, (err) => {
            if (err) console.error('Error creating expenses table:', err);
           
            
            connection.query(createIncomeTable, (err) => {
              if (err) console.error('Error creating income table:', err);
              
              
              connection.query(createUsersTable, (err) => {
                if (err) console.error('Error creating users table:', err);
               
                
                connection.query(createBudgetsTable, (err) => {
                  if (err) console.error('Error creating budgets table:', err);
                 
                  
                  connection.query(insertDefaultCategories, (err) => {
                    if (err) console.error('Error inserting default categories:', err);
                
                    
                    console.log('Database initialization completed');
                    connection.end();
                  });
                });
              });
            });
          });
        });
      });
    }
  );
};

module.exports = initializeDatabase; 