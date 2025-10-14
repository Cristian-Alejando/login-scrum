const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../database'); // <-- importar pool
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'mi-secreto-super-seguro';

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    );
    res.json({ message: 'Usuario creado' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login exitoso', token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
