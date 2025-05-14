const express = require('express');
const router = express.Router();
const db = require('../database/database'); // adjust this if your db file is in another path

// Endpoint to receive and insert multiple offline expenses
router.post('/expenses', async (req, res) => {
  const expenses = req.body;

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return res.status(400).json({ error: 'No expenses to sync' });
  }

  const insertQuery = `
    INSERT INTO expenses (amount, description, date, category_id) 
    VALUES (?, ?, ?, ?)
  `;

  try {
    for (const exp of expenses) {
      await new Promise((resolve, reject) => {
        db.query(insertQuery, [exp.amount, exp.description, exp.date, exp.category_id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    res.status(200).json({ message: 'Expenses synced successfully' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Failed to sync expenses' });
  }
});

module.exports = router;
