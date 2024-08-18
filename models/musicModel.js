// modelo das musicas
const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },  // Artista (NewJeans)
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // Referência ao álbum (relacionamento)
  releaseDate: { type: Date }, // Data de lançamento da música
  genre: { type: String },  // Gênero musical
  duration: { type: String },  // Duração da música
  lyrics: { type: String },  // Letras da música
  createdAt: { type: Date, default: Date.now } // Data de criação no banco
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
