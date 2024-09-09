const express = require('express');
const { createAdmin, getAllUsers } = require('../controllers/adminController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para pegar todos os usuários (somente admin)
router.get('/', auth, isAdmin, getAllUsers);

// Rota para criar um novo admin (somente admin)
router.post('/', auth, isAdmin, createAdmin);

module.exports = router;