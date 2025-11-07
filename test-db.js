const { pool } = require('./backend/database');

async function ejemplo() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS fecha');
    console.log('Conexión OK:', rows);
  } catch (err) {
    console.error('Error al conectar:', err);
  } finally {
    await pool.end();
  }
}

ejemplo();
