const { getDbConnection } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'super_secrete_key16';

exports.register = (req, res) => {
  const db = getDbConnection();
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hash], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'User already exists or DB error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const db = getDbConnection();
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.getMe = (req, res) => {
  const db = getDbConnection();
  const userId = req.user.id;

  db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(results[0]);
  });
};
