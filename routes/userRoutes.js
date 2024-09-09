const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const { auth, isAdminOrUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar o perfil do usuário autenticado
router.get('/me', auth, getUser);

// Rota para editar o perfil do usuário autenticado
router.put('/:id', auth, isAdminOrUser, updateUser);

// Rota para deletar um usuário (somente admin)
router.delete('/:id', auth, isAdminOrUser, deleteUser);

module.exports = router;
