const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPlaylist, getUserPlaylists, updatePlaylist, deletePlaylist, getPlaylistByUsers } = require("../controllers/playlistController");

// Rota para criar uma nova playlist
router.post('/', auth, createPlaylist);

// Rota para pegar todas as playlists do usuário autenticado
router.get('/', auth, getUserPlaylists);

// Rota para ver quantas playlits cada usuário tem
router.get('/all', auth, getPlaylistByUsers);

// Rota para atualizar uma playlist
router.put('/:id', auth, updatePlaylist);

// Rota para deletar uma playlist
router.delete('/:id', auth, deletePlaylist);

module.exports = router;
