// vou criar as rotas para os adms
const express = require('express');
const { createAdmin, getAllUsers } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar todos os usuários (somente admin)
router.get('/', auth, getAllUsers);

// Rota para criar um novo admin (somente admin)
router.post('/', auth, createAdmin);

module.exports = router;