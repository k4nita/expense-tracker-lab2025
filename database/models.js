const db = require('./config');

// Category model functions
const Category = {
  getAll: (callback) => {
    db.query('SELECT * FROM categories', callback);
  },
  getByType: (type, callback) => {
    db.query('SELECT * FROM categories WHERE type = ?', [type], callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM categories WHERE id = ?', [id], callback);
  },
  create: (category, callback) => {
    db.query('INSERT INTO categories (name, type) VALUES (?, ?)', 
      [category.name, category.type], callback);
  },
  update: (id, category, callback) => {
    db.query('UPDATE categories SET name = ?, type = ? WHERE id = ?', 
      [category.name, category.type, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM categories WHERE id = ?', [id], callback);
  }
};

// Expense model functions
const Expense = {
  getAll: (callback) => {
    db.query(`
      SELECT e.*, c.name as category_name 
      FROM expenses e 
      LEFT JOIN categories c ON e.category_id = c.id
      ORDER BY e.date DESC`, 
      callback);
  },
  getById: (id, callback) => {
    db.query(`
      SELECT e.*, c.name as category_name 
      FROM expenses e 
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.id = ?`, 
      [id], callback);
  },
  getByDateRange: (startDate, endDate, callback) => {
    db.query(`
      SELECT e.*, c.name as category_name 
      FROM expenses e 
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.date BETWEEN ? AND ?
      ORDER BY e.date DESC`, 
      [startDate, endDate], callback);
  },
  create: (expense, callback) => {
    db.query(`
      INSERT INTO expenses (amount, description, date, category_id) 
      VALUES (?, ?, ?, ?)`, 
      [expense.amount, expense.description, expense.date, expense.category_id], 
      callback);
  },
  update: (id, expense, callback) => {
    db.query(`
      UPDATE expenses 
      SET amount = ?, description = ?, date = ?, category_id = ? 
      WHERE id = ?`, 
      [expense.amount, expense.description, expense.date, expense.category_id, id], 
      callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM expenses WHERE id = ?', [id], callback);
  },
  getTotalByCategory: (startDate, endDate, callback) => {
    db.query(`
      SELECT c.name, SUM(e.amount) as total 
      FROM expenses e 
      JOIN categories c ON e.category_id = c.id
      WHERE e.date BETWEEN ? AND ?
      GROUP BY c.id
      ORDER BY total DESC`, 
      [startDate, endDate], callback);
  }
};

// Income model functions
const Income = {
  getAll: (callback) => {
    db.query(`
      SELECT i.*, c.name as category_name 
      FROM income i 
      LEFT JOIN categories c ON i.category_id = c.id
      ORDER BY i.date DESC`, 
      callback);
  },
  getById: (id, callback) => {
    db.query(`
      SELECT i.*, c.name as category_name 
      FROM income i 
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.id = ?`, 
      [id], callback);
  },
  getByDateRange: (startDate, endDate, callback) => {
    db.query(`
      SELECT i.*, c.name as category_name 
      FROM income i 
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.date BETWEEN ? AND ?
      ORDER BY i.date DESC`, 
      [startDate, endDate], callback);
  },
  create: (income, callback) => {
    db.query(`
      INSERT INTO income (amount, description, date, category_id) 
      VALUES (?, ?, ?, ?)`, 
      [income.amount, income.description, income.date, income.category_id], 
      callback);
  },
  update: (id, income, callback) => {
    db.query(`
      UPDATE income 
      SET amount = ?, description = ?, date = ?, category_id = ? 
      WHERE id = ?`, 
      [income.amount, income.description, income.date, income.category_id, id], 
      callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM income WHERE id = ?', [id], callback);
  },
  getTotalByCategory: (startDate, endDate, callback) => {
    db.query(`
      SELECT c.name, SUM(i.amount) as total 
      FROM income i 
      JOIN categories c ON i.category_id = c.id
      WHERE i.date BETWEEN ? AND ?
      GROUP BY c.id
      ORDER BY total DESC`, 
      [startDate, endDate], callback);
  }
};

// Budget model functions
const Budget = {
  getAll: (callback) => {
    db.query(`
      SELECT b.*, c.name as category_name 
      FROM budgets b 
      LEFT JOIN categories c ON b.category_id = c.id
      ORDER BY b.end_date DESC`, 
      callback);
  },
  getById: (id, callback) => {
    db.query(`
      SELECT b.*, c.name as category_name 
      FROM budgets b 
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.id = ?`, 
      [id], callback);
  },
  getActive: (callback) => {
    const today = new Date().toISOString().split('T')[0];
    db.query(`
      SELECT b.*, c.name as category_name 
      FROM budgets b 
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE ? BETWEEN b.start_date AND b.end_date`, 
      [today], callback);
  },
  create: (budget, callback) => {
    db.query(`
      INSERT INTO budgets (category_id, amount, start_date, end_date) 
      VALUES (?, ?, ?, ?)`, 
      [budget.category_id, budget.amount, budget.start_date, budget.end_date], 
      callback);
  },
  update: (id, budget, callback) => {
    db.query(`
      UPDATE budgets 
      SET category_id = ?, amount = ?, start_date = ?, end_date = ? 
      WHERE id = ?`, 
      [budget.category_id, budget.amount, budget.start_date, budget.end_date, id], 
      callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM budgets WHERE id = ?', [id], callback);
  }
};

// User model functions
const User = {
  getAll: (callback) => {
    db.query('SELECT id, username, email, created_at FROM users', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id], callback);
  },
  getByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
  create: (user, callback) => {
    db.query(`
      INSERT INTO users (username, email, password) 
      VALUES (?, ?, ?)`, 
      [user.username, user.email, user.password], 
      callback);
  },
  update: (id, user, callback) => {
    db.query(`
      UPDATE users 
      SET username = ?, email = ?, password = ? 
      WHERE id = ?`, 
      [user.username, user.email, user.password, id], 
      callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

// Summary and reporting functions
const Reports = {
  monthlySummary: (year, month, callback) => {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;
    
    db.query(`
      SELECT 
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expenses,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income,
        (SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) - 
         SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END)) as net_savings
      FROM (
        SELECT amount, 'expense' as type FROM expenses WHERE date BETWEEN ? AND ?
        UNION ALL
        SELECT amount, 'income' as type FROM income WHERE date BETWEEN ? AND ?
      ) t`,
      [startDate, endDate, startDate, endDate],
      callback
    );
  },
  
  cashFlow: (startDate, endDate, callback) => {
    db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        'expense' as type,
        amount,
        description,
        category_id
      FROM expenses 
      WHERE date BETWEEN ? AND ?
      
      UNION ALL
      
      SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        'income' as type,
        amount,
        description,
        category_id
      FROM income 
      WHERE date BETWEEN ? AND ?
      
      ORDER BY date ASC`,
      [startDate, endDate, startDate, endDate],
      callback
    );
  }
};

module.exports = {
  Category,
  Expense,
  Income,
  Budget,
  User,
  Reports
}; 