-- Crear base de datos y tabla users para MySQL
CREATE DATABASE IF NOT EXISTS login_scrum;
USE login_scrum;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla para resultados de las pruebas
CREATE TABLE IF NOT EXISTS test_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  test_name VARCHAR(50) NOT NULL,
  score INT NOT NULL,
  time_taken_ms INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);