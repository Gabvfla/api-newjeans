const express = require('express');
const { addAlbum, getAlbum, updateAlbum, deleteAlbum, getAllAlbums } = require('../controllers/albumController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar novo álbum (somente admin)
router.post('/album', auth, addAlbum);

// Obter todos os álbuns
router.get('/album', getAllAlbums);

// Obter um álbum específico
router.get('/album/:id', getAlbum);

// Atualizar álbum (somente admin)
router.put('/album/:id', auth, updateAlbum);

// Deletar álbum (somente admin)
router.delete('/album/:id', auth, deleteAlbum);

module.exports = router;
