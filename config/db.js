// Banco de Dados moongose
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Sair do processo em caso de erro
  }
};

module.exports = connectDB;
