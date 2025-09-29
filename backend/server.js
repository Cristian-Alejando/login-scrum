const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));