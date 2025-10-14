require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'login_scrum',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10
});

module.exports = { pool };
