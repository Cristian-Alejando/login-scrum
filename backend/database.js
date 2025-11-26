require('dotenv').config();
const mysql = require('mysql2/promise'); // <--- ¡ESTA LÍNEA FALTABA!

const dbConfig = {
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'login_scrum',
};

// Si el host empieza con /cloudsql, úsalo como socketPath
if (process.env.DB_HOST && process.env.DB_HOST.startsWith('/cloudsql')) {
  dbConfig.socketPath = process.env.DB_HOST;
} else {
  dbConfig.host = process.env.DB_HOST || '127.0.0.1';
  dbConfig.port = process.env.DB_PORT || 3306;
}

const pool = mysql.createPool(dbConfig);

module.exports = { pool };