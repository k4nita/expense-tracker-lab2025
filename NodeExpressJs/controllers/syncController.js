const { getDbConnection } = require('../database/database');

const syncExpenses = (req, res) => {
  const db = getDbConnection();
  const localExpenses = req.body;

  if (!Array.isArray(localExpenses)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const inserted = [];
  let completed = 0;

  localExpenses.forEach((expense, index) => {
    const query = 'INSERT INTO expenses (date, type, category, amount, notes) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [expense.date, expense.type, expense.category, expense.amount, expense.notes], (err, result) => {
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
