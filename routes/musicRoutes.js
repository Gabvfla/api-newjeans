const express = require('express');
const { addMusic, getMusic, updateMusic, deleteMusic, getAllMusic } = require('../controllers/musicController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar nova música (somente admin)
router.post('/', auth, addMusic);

// Obter todas as músicas com paginação
router.get('/', auth, getAllMusic);

// Obter uma música específica
router.get('/:id', auth, getMusic);

// Atualizar música (somente admin)
router.put('/:id', auth, updateMusic);

// Deletar música (somente admin)
router.delete('/:id', auth, deleteMusic);

module.exports = router;

