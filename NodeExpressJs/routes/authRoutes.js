const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const expenseController = require('../controllers/expenseController'); // Import this if getExpenses is defined here

const authMiddleware = require('../middleware/authMiddleware');

// Use getExpenses from the controller
router.get('/expenses', authMiddleware, expenseController.getExpenses);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
