const Album = require('../models/albumModel');
const Music = require('../models/musicModel');
const User = require("../models/userModel");

// Adicionar novo álbum
exports.addAlbum = async (req, res) => {
  const { title, releaseDate, genre, coverImage } = req.body;

  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem adicionar albums." });
    }
    const newAlbum = new Album({ title, releaseDate, genre, coverImage });
    const album = await newAlbum.save();
    res.json(album);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar o álbum', error: err.message });
  }
};

// Obter todos os álbuns com paginação
exports.getAllAlbums = async (req, res) => {
  const { limite = 10, página = 1 } = req.query;
  const limit = parseInt(limite);
  const page = parseInt(página);

  if (![3, 6, 9].includes(limit)) {
    return res.status(400).json({ msg: 'O parâmetro limite deve ser 3, 6 ou 9' });
  }

  try {
    const albums = await Album.find()
      .populate('tracks')
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(albums);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar os álbuns', error: err.message });
  }
};

// Obter um álbum específico
exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('tracks');
    if (!album) return res.status(404).json({ msg: 'Álbum não encontrado' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar o álbum', error: err.message });
  }
};

// Atualizar álbum
exports.updateAlbum = async (req, res) => {
  const { title, releaseDate, genre, coverImage } = req.body;
  
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem editar albums." });
    }
    let album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ msg: 'Álbum não encontrado' });

    album.title = title || album.title;
    album.releaseDate = releaseDate || album.releaseDate;
    album.genre = genre || album.genre;
    album.coverImage = coverImage || album.coverImage;

    await album.save();
    res.json(album);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar o álbum', error: err.message });
  }
};

// Deletar álbum
exports.deleteAlbum = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem deletar albums." });
    }
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ msg: 'Álbum não encontrado' });

    // Remover músicas do álbum
    await Music.deleteMany({ album: album._id });

    // Deletar o álbum
    await Album.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Álbum deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar o álbum', error: err.message });
  }
};
