const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const createFirstUsers = async () => {
    try {
        // Verifica se já existem usuários no banco de dados
        const adminExists = await User.findOne({ isAdmin: true });
        if (!adminExists) {
            const admin = new User({
                name: 'Administrador',
                email: process.env.EMAIL_ADMIN,
                password: await bcrypt.hash(process.env.SENHA_ADMIN, 10),
                isAdmin: true
            });
            await admin.save();
            console.log('Administrador criado com sucesso');
        } else {
            console.log('O Administrador já existe');
        }

        // Cria usuários padrão
        const usersData = [
            { name: 'Gabriel', email: 'gabriel@newjeans.com', password: 'gabriel' },
            { name: 'Marlon', email: 'marlon@newjeans.com', password: 'marlon' },
            { name: 'Bruna', email: 'bruna@newjeans.com', password: 'bruna' }
        ];

        for (const userData of usersData) {
            const userExists = await User.findOne({ email: userData.email });
            if (!userExists) {
                const user = new User({
                    name: userData.name,
                    email: userData.email,
                    password: await bcrypt.hash(userData.password, 10)
                });
                await user.save();
                console.log(`Usuário ${userData.name} criado com sucesso`);
            } else {
                console.log(`Usuário com email ${userData.email} já existe`);
            }
        }
    } catch (error) {
        console.error('Erro na criação de usuários', error.message);
    }
};

module.exports = createFirstUsers;
