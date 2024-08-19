const Album = require('../models/albumModel');
const Music = require('../models/musicModel');

// Adicionar novo álbum
exports.addAlbum = async (req, res) => {
  const { title, releaseDate, genre, coverImage } = req.body;

  try {
    const newAlbum = new Album({ title, releaseDate, genre, coverImage });
    const album = await newAlbum.create();
    res.json(album);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar o álbum', error: err.message });
  }
};

// Obter todos os álbuns
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('tracks'); 
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
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ msg: 'Álbum não encontrado' });

    // Remover músicas do álbum
    await Music.deleteMany({ album: album._id });

    await album.remove();
    res.json({ msg: 'Álbum deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar o álbum', error: err.message });
  }
};
