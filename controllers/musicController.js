// Pretendo que esse arquivo controle as musicas que estão no banco de dados
const Music = require('../models/musicModel');
const Album = require('../models/albumModel');

// Adicionar nova música e associá-la a um álbum
exports.addMusic = async (req, res) => {
  const { title, album, duration } = req.body;

  try {
    const newMusic = new Music({ title, album, duration });
    const music = await newMusic.save();

    if (album) {
      // Adicionar música à lista de faixas do álbum
      const albumDoc = await Album.findById(album);
      if (albumDoc) {
        albumDoc.tracks.push(music._id);
        await albumDoc.save();
      }
    }

    res.json(music);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao adicionar a música', error: err.message });
  }
};

// Obter todas as músicas com paginação
exports.getAllMusic = async (req, res) => {
  const { limite = 10, página = 1 } = req.query;
  const limit = parseInt(limite);
  const page = parseInt(página);

  if (![5, 10, 30].includes(limit)) {
    return res.status(400).json({ msg: 'O parâmetro limite deve ser 5, 10 ou 30' });
  }

  try {
    const musics = await Music.find()
      .populate('album') 
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(musics);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar as músicas', error: err.message });
  }
};

// Obter uma música específica
exports.getMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id).populate('album');
    if (!music) return res.status(404).json({ msg: 'Música não encontrada' });
    res.json(music);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar a música', error: err.message });
  }
};

// Atualizar uma música
exports.updateMusic = async (req, res) => {
  const { title, album, duration } = req.body;

  try {
    let music = await Music.findById(req.params.id);
    if (!music) return res.status(404).json({ msg: 'Música não encontrada' });

    music.title = title || music.title;
    music.album = album || music.album;
    music.duration = duration || music.duration;

    await music.save();
    res.json(music);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar a música', error: err.message });
  }
};

// Deletar música
exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) return res.status(404).json({ msg: 'Música não encontrada' });

    // Remover a música da lista de faixas do álbum
    if (music.album) {
      const albumDoc = await Album.findById(music.album);
      if (albumDoc) {
        albumDoc.tracks = albumDoc.tracks.filter(trackId => trackId.toString() !== music._id.toString());
        await albumDoc.save();
      }
    }

    await music.remove();
    res.json({ msg: 'Música deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar a música', error: err.message });
  }
};
