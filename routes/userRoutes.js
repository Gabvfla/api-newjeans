// rotas de usuarios
const express = require('express');
const { getUser, updateUser, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar o perfil do usuário autenticado
router.get('/me', auth, getUser);

// Rota para editar o perfil do usuário autenticado
router.put('/me', auth, updateUser);

// Rota para pegar todos os usuários (somente admin)
router.get('/', auth, getAllUsers);

module.exports = router;
