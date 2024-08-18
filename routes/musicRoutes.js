// rotas das musicas

const express = require('express');
const { addMusic, getMusic, updateMusic, deleteMusic, getAllMusic } = require('../controllers/musicController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar nova música (somente admin)
router.post('/music', auth, addMusic);

// Obter todas as músicas
router.get('/music', getAllMusic);

// Obter uma música específica
router.get('/music/:id', getMusic);

// Atualizar música (somente admin)
router.put('/music/:id', auth, updateMusic);

// Deletar música (somente admin)
router.delete('/music/:id', auth, deleteMusic);

module.exports = router;
