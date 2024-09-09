const express = require('express');
const { addMusic, getMusic, updateMusic, deleteMusic, getAllMusic } = require('../controllers/musicController');
const {auth, isAdmin} = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar nova música (somente admin)
router.post('/', auth, isAdmin, addMusic);

// Obter todas as músicas com paginação
router.get('/', getAllMusic);

// Obter uma música específica
router.get('/:id', auth, getMusic);

// Atualizar música (somente admin)
router.put('/:id', auth, isAdmin, updateMusic);

// Deletar música (somente admin)
router.delete('/:id', auth, isAdmin, deleteMusic);

module.exports = router;

