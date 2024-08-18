const User = require('../models/userModel');

const createFirstAdmin = async () => {
    try {
        const adminExists = await User.findOne({ isAdmin: true });
        if (!adminExists) {
            const admin = new User({
                username: 'Administrador',
                email: 'admin@newjeans.com',
                password: 'bunnys', 
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
