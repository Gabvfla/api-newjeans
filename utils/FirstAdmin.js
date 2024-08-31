const User = require('../models/userModel');
const dotenv = require('dotenv').config();

const createFirstAdmin = async () => {
    try {
        const adminExists = await User.findOne({ isAdmin: true });
        if (!adminExists) {
            const admin = new User({
                name: 'Administrador',
                email: process.env.EMAIL_ADMIN,
                password: process.env.SENHA_ADMIN, 
                isAdmin: true
            });
            await admin.save();
            console.log('Adm Criado com Sucesso');
        } else {
            console.log('O Adm já existe');
        }
    } catch (error) {
        console.error('erro na criação do adm', error.message);
    }
};

module.exports = createFirstAdmin;
