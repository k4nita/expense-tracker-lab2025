const express = require('express');
const router = express.Router();

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/expenses', authMiddleware, expenseController.getExpenses);
router.post('/expenses', authMiddleware, expenseController.addExpense);
router.put('/expenses/:id',authMiddleware, expenseController.updateExpense);
router.delete('/expenses/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;
