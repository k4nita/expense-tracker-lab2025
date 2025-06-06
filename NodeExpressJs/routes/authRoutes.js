const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const expenseController = require('../controllers/expenseController'); 
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Expense route (protected)
router.get('/expenses', authMiddleware, expenseController.getExpenses);

// ✅ Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ NEW: Logout route
router.post('/logout', authController.logout);

// ✅ NEW: Get current user profile info
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
