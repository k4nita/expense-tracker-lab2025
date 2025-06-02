require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const initializeDatabase = require('./database/init');
const errorHandler = require('./middleware/errorHandler');



// Initialize database
console.log('Initializing database...');
initializeDatabase();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//ErrroHandler
app.use(errorHandler);

// Routes
app.use('/api', expenseRoutes);
app.use('/api', syncRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing purposes
