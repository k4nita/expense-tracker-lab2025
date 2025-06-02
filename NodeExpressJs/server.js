require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const initializeDatabase = require('./database/init');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('./middleware/logger');

// Initialize database
console.log('Initializing database...');
initializeDatabase();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Security Middlewares
app.use(helmet()); // sets secure headers
app.use(xss()); // prevents cross-site scripting attacks
app.use(mongoSanitize()); // prevents NoSQL injection

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

//logger
app.use(logger);


// Routes
app.use('/api', expenseRoutes);
app.use('/api', syncRoutes);
app.use('/api/auth', authRoutes);

//ErrroHandler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing purposes
