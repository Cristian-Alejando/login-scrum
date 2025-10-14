const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./backend/routes/users');

app.use(express.json());
app.use('/api/users', usersRouter);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas para las páginas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend/home.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'frontend/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'frontend/login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'frontend/dashboard.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
