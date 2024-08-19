// rotas de usuarios
const express = require('express');
const { getUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar o perfil do usuário autenticado
router.get('/user', auth, getUser);

// Rota para editar o perfil do usuário autenticado
router.put('/user', auth, updateUser);

// Rota para pegar todos os usuários (somente admin)
router.get('/users', auth, getAllUsers);

// Rota para deletar um usuário (somente admin)
router.delete('/user/:id', auth, deleteUser);

module.exports = router;
