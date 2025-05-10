const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use(cors());
app.use(express.json());
app.use('/', expenseRoutes);

module.exports = app;
