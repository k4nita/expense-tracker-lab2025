const db = require('../database/database');

const getExpenses = (req, res) => {
  const query = 'SELECT * FROM expenses';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};


// POST a new expense
const addExpense = (req, res) => {
  const { date, type, category, amount, notes } = req.body;
  const query = 'INSERT INTO expenses (date, type, category, amount, notes) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [date, type, category, amount, notes], (err, result) => {
    if (err) {
      console.error('Error inserting expense:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Expense added successfully', id: result.insertId });
  });
};

// PUT update an expense by ID
const updateExpense = (req, res) => {
  const { id } = req.params;
  const { date, type, category, amount, notes } = req.body;
  const query = 'UPDATE expenses SET date = ?, type = ?, category = ?, amount = ?, notes = ? WHERE id = ?';
  db.query(query, [date, type, category, amount, notes, id], (err, result) => {
    if (err) {
      console.error('Error updating expense:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Expense updated successfully' });
  });
};

// DELETE expense
const deleteExpense = (req, res) => {
  const expenseId = req.params.id;

  const sql = 'DELETE FROM expenses WHERE id = ?';

  db.query(sql, [expenseId], (err, result) => {
    if (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Failed to delete expense' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Expense not found' });
    } else {
      res.status(200).json({ message: 'Expense deleted successfully' });
    }
  });
};


module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};
