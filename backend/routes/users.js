const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../database'); // <-- importar pool
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mi-secreto-super-seguro';

// Helper: simple input validation
function validateAuthInput(username, password) {
  if (!username || !password) return 'Username and password are required';
  if (typeof username !== 'string' || typeof password !== 'string') return 'Invalid input types';
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : req.headers['x-access-token'] || null;
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.user = payload; // { username }
    next();
  });
}

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const v = validateAuthInput(username, password);
  if (v) return res.status(400).json({ error: v });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    );
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    if (err && (err.code === 'ER_DUP_ENTRY' || err.errno === 19)) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows && rows[0];
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Contrase\u00f1a incorrecta' });

    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '24h' });
    // Set cookie (HttpOnly) so browser sends it automatically on next requests
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ message: 'Login exitoso', token, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Protected route: get current user info
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const username = req.user && req.user.username;
    const [rows] = await pool.query('SELECT id, username FROM users WHERE username = ?', [username]);
    const user = rows && rows[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
