const { Expense } = require('../models');

const syncExpenses = (req, res) => {
  const localExpenses = req.body;

  if (!Array.isArray(localExpenses)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const inserted = [];
  let completed = 0;

  localExpenses.forEach((expense, index) => {
    Expense.create(expense, (err, result) => {
      completed++;

      if (!err) {
        inserted.push(result.insertId);
      }

      if (completed === localExpenses.length) {
        res.status(200).json({ message: 'Sync completed', insertedIds: inserted });
      }
    });
  });
};

module.exports = { syncExpenses };
