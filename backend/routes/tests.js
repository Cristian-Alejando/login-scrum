// backend/routes/tests.js
const express = require('express');
const router = express.Router();
const { pool } = require('../database'); // Importar { pool } igual que en users.js
const auth = require('../auth'); // Asumo que tu middleware JWT se llama auth.js

// Proteger la ruta: solo usuarios logueados pueden guardar
router.post('/save-result', auth.verifyToken, async (req, res) => {
  const { testName, score, timeTakenMs } = req.body;
  const userId = req.userId; // Obtenido del token JWT

  if (!testName || score == null || timeTakenMs == null) {
    return res.status(400).json({ error: 'Faltan datos de la prueba' });
  }

  try {
    const query = 'INSERT INTO test_results (user_id, test_name, score, time_taken_ms) VALUES (?, ?, ?, ?)';
    await pool.execute(query, [userId, testName, score, timeTakenMs]);
    res.status(201).json({ message: 'Resultado guardado exitosamente' });
  } catch (err) {
    console.error('Error al guardar resultado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;