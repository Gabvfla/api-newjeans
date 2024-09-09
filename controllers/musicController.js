// Pretendo que esse arquivo controle as musicas que estão no banco de dados
const Music = require('../models/musicModel');
const Album = require('../models/albumModel');
const User = require('../models/userModel');
const Member = require('../models/memberModel');

// Adicionar nova música e associá-la a um álbum
exports.addMusic = async (req, res) => {
  const { title, album, duration, writtenBy } = req.body;

  try {
    // Verificar se o ID do álbum existe no banco de dados
    const albumDoc = await Album.findById(album);
    if (!albumDoc) {
      return res.status(400).json({ msg: 'Álbum não encontrado. Verifique o ID do álbum.' });
    }

    // Verificar se o ID do membro existe no banco de dados
    if (writtenBy) {
      const memberDoc = await Member.findById(writtenBy);
      if (!memberDoc) {
        return res.status(400).json({ msg: 'Membro não encontrado. Verifique o ID do membro.' });
      }
    }

    // Criar nova música
    const newMusic = new Music({ title, album, duration, writtenBy });
    const music = await newMusic.save();

    // Adicionar música à lista de faixas do álbum
    albumDoc.tracks.push(music._id);
    await albumDoc.save();

    // Adicionar música à lista de músicas escritas pelo membro (se aplicável)
    if (writtenBy) {
      const memberDoc = await Member.findById(writtenBy);
      if (memberDoc) {
        memberDoc.writtenSongs.push(music._id);
        await memberDoc.save();
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

  if (![4, 8, 12].includes(limit)) {
    return res.status(400).json({ msg: 'O parâmetro limite deve ser 4, 8 ou 12' });
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

    // Deletar a música
    await Music.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Música deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar a música', error: err.message });
  }
};
