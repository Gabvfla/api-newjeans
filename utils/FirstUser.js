const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const createFirstUser = async () => {
    try {
        const userExists = await User.findOne({ isAdmin: false });
        if (!userExists) {
            const user = new User({
                name: 'Gabriel',
                email: process.env.EMAIL_USER,
                password: process.env.SENHA_USER, 
                isAdmin: false
            });
            await user.save();
            console.log('Gabriel Criado com Sucesso');	
        }
    } catch (error) {
        console.error('erro na criação do primeiro usuário', error.message);
    }
};

module.exports = createFirstUser;
