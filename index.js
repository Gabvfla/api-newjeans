const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const createFirstAdmin = require('./utils/FirstAdmin');
const albumRoutes = require('./routes/albumRoutes');
const musicRoutes = require('./routes/musicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Conecta ao MongoDB
connectDB();

// Cria o primeiro adm
createFirstAdmin();

// Middleware para leitura de JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/album', albumRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
console.log('testando ' + process.env.TESTE);
console.log(process.env.JWT_SECRET)
