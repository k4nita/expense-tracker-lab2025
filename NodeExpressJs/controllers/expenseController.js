const { getDbConnection } = require('../database/database');

// ✅ GET EXPENSES FOR LOGGED-IN USER ONLY
const getExpenses = (req, res) => {
  const db = getDbConnection();
  const userId = req.user.id;

  const query = 'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};

// ✅ ADD EXPENSE (with logged-in user's ID)
const addExpense = (req, res) => {
  const db = getDbConnection();
  const userId = req.user.id;
  const { date, type, category, amount, notes } = req.body;

  const query = 'INSERT INTO expenses (date, type, category, amount, notes, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [date, type, category, amount, notes, userId], (err, result) => {
    if (err) {
      console.error('Error inserting expense:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Expense added successfully', id: result.insertId });
  });
};

// ✅ UPDATE EXPENSE (only if it belongs to the logged-in user)
const updateExpense = (req, res) => {
  const db = getDbConnection();
  const userId = req.user.id;
  const { id } = req.params;
  const { date, type, category, amount, notes } = req.body;

  const query = `
    UPDATE expenses 
    SET date = ?, type = ?, category = ?, amount = ?, notes = ?
    WHERE id = ? AND user_id = ?
  `;
  db.query(query, [date, type, category, amount, notes, id, userId], (err, result) => {
    if (err) {
      console.error('Error updating expense:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found or not authorized' });
    }
    res.json({ message: 'Expense updated successfully' });
  });
};

// ✅ DELETE EXPENSE (only if it belongs to the logged-in user)
const deleteExpense = (req, res) => {
  const db = getDbConnection();
  const userId = req.user.id;
  const expenseId = req.params.id;

  const query = 'DELETE FROM expenses WHERE id = ? AND user_id = ?';
  db.query(query, [expenseId, userId], (err, result) => {
    if (err) {
      console.error('Error deleting expense:', err);
      return res.status(500).json({ error: 'Failed to delete expense' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found or not authorized' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  });
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
