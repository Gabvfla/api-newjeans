const Playlist = require('../models/playlistModel');
const Music = require('../models/musicModel');
const User = require('../models/userModel');

exports.createPlaylist = async (req, res) => {
  const { title, musics, description } = req.body;

  try {
    // Verificar se o ID do usuário autenticado é válido e se o usuário existe no banco de dados
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado. Verifique o ID do usuário.' });
    }

    // Verificar se todas as músicas fornecidas existem no banco de dados
    const validMusics = await Music.find({ _id: { $in: musics } });
    if (validMusics.length !== musics.length) {
      return res.status(400).json({ msg: 'Uma ou mais músicas não são válidas.' });
    }

    // Criar nova playlist
    const newPlaylist = new Playlist({
      title,
      description,
      musics,
      createdBy: user._id // Associa a playlist ao usuário autenticado
    });

    const savedPlaylist = await newPlaylist.save();
    
    res.status(201).json({ playlist: savedPlaylist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao criar playlist', error: err.message });
  }
};

// Obter todas as playlists do usuário autenticado
exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.user });
    res.status(200).json({ playlists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar playlists' });
  }
};

// Editar uma playlist existente
exports.updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { title, description, musics } = req.body;

  try {
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist não encontrada' });
    }

    // Verifica se o usuário autenticado é o criador da playlist
    if (playlist.createdBy.toString() !== req.user) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    // Atualiza os dados da playlist
    playlist.title = title || playlist.title;
    playlist.description = description || playlist.description;

    if (musics) {
      const validMusics = await Music.find({ _id: { $in: musics } });

      if (validMusics.length !== musics.length) {
        return res.status(400).json({ msg: 'Uma ou mais músicas não são válidas' });
      }

      playlist.musics = musics;
    }

    const updatedPlaylist = await playlist.save();
    res.status(200).json({ playlist: updatedPlaylist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar playlist' });
  }
};

// Deletar uma playlist
exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist não encontrada' });
    }

    // Verifica se o usuário autenticado é o criador da playlist
    if (playlist.user.toString() !== req.user) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    // Deletar a playlist
    await Playlist.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Playlist deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao deletar playlist' });
  }
};
