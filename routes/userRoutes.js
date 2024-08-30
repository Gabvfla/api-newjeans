// rotas de usuarios
const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar o perfil do usuário autenticado
router.get('/me', auth, getUser);

// Rota para editar o perfil do usuário autenticado
router.put('/:id', auth, updateUser);

// Rota para deletar um usuário (somente admin)
router.delete('/:id', auth, deleteUser);

module.exports = router;
