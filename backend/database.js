require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  user: process.env.DB_USER || 'root', // Asegúrate que sea root
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login_scrum',
};

// Prioridad al socket path explícito
if (process.env.DB_SOCKET_PATH) {
  dbConfig.socketPath = process.env.DB_SOCKET_PATH;
} else if (process.env.DB_HOST && process.env.DB_HOST.startsWith('/cloudsql')) {
  dbConfig.socketPath = process.env.DB_HOST;
} else {
  dbConfig.host = process.env.DB_HOST || '127.0.0.1';
  dbConfig.port = process.env.DB_PORT || 3306;
}

const pool = mysql.createPool(dbConfig);

module.exports = { pool };