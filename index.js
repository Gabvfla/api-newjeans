const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const albumRoutes = require('./routes/albumRoutes');
const musicRoutes = require('./routes/musicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const installRoutes = require('./routes/installRoutes');
const memberRoutes = require('./routes/memberRoutes');
const app = express();


// Conecta ao MongoDB
connectDB();

// Middleware para leitura de JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/album', albumRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/install', installRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
