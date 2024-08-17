const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conecta ao MongoDB
connectDB();

// Middleware para leitura de JSON
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // Adiciona as rotas de usuário

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
