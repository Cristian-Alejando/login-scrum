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

// Legacy auth shim
// Este archivo existía como versión SQLite. Para evitar confusión, re-exportamos
// el router MySQL que vive en backend/routes/users.js

module.exports = require('./routes/users');