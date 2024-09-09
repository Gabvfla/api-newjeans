const express = require('express');
const { addAlbum, getAlbum, updateAlbum, deleteAlbum, getAllAlbums } = require('../controllers/albumController');
const {auth, isAdmin} = require('../middleware/authMiddleware');
const router = express.Router();

// Adicionar novo álbum (somente admin)
router.post('/', auth, isAdmin, addAlbum);

// Obter todos os álbuns
router.get('/', getAllAlbums);

// Obter um álbum específico
router.get('/:id', auth, getAlbum);

// Atualizar álbum (somente admin)
router.put('/:id', auth, isAdmin, updateAlbum);

// Deletar álbum (somente admin)
router.delete('/:id', auth, isAdmin, deleteAlbum);

module.exports = router;
