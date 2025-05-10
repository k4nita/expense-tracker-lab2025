const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

// Initialize database
const initializeDatabase = require('./database/init');
// Run database initialization
console.log('Initializing database...');
initializeDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', expenseRoutes);

module.exports = app;
