require('dotenv').config();
const express = require('express');
const cors = require('cors');

const expenseRoutes = require('./routes/expenseRoutes');
const dotenv = require('dotenv');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', expenseRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
