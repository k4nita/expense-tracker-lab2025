const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', expenseRoutes);

module.exports = app;
