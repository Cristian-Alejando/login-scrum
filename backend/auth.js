const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function (err) {
    if (err) return res.status(400).json({ error: 'Usuario ya existe' });
    res.json({ message: 'Usuario creado' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // ➜ Generar token JWT (24 h)
    const jwt = require('jsonwebtoken');
    const SECRET = 'mi-secreto-super-seguro';
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login exitoso', token, username: user.username });
  });
});

module.exports = router;