const db = require('../database/database');

exports.getExpenses = (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addExpense = (req, res) => {
  const { date, type, category, amount, notes } = req.body;
  const sql = 'INSERT INTO expenses (date, type, category, amount, notes) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [date, type, category, amount, notes], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Expense added', id: result.insertId });
  });
};

exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { date, type, category, amount, notes } = req.body;
  const sql = 'UPDATE expenses SET date = ?, type = ?, category = ?, amount = ?, notes = ? WHERE id = ?';
  db.query(sql, [date, type, category, amount, notes, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense updated' });
  });
};

exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM expenses WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense deleted' });
  });
};
