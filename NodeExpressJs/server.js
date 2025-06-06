require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');


const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const initializeDatabase = require('./database/init');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Initialize database
console.log('Initializing database...');
initializeDatabase();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());         
app.use(helmet());
app.use(xss());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);


app.use(logger);


app.use('/api', expenseRoutes);
app.use('/api', syncRoutes);
app.use('/api/auth', authRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
