const express = require('express');
const { addAlbum, getAlbum, updateAlbum, deleteAlbum, getAllAlbums } = require('../controllers/albumController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar novo álbum (somente admin)
router.post('/', auth, addAlbum);

// Obter todos os álbuns
router.get('/', auth, getAllAlbums);

// Obter um álbum específico
router.get('/:id', auth, getAlbum);

// Atualizar álbum (somente admin)
router.put('/:id', auth, updateAlbum);

// Deletar álbum (somente admin)
router.delete('/:id', auth, deleteAlbum);

module.exports = router;
