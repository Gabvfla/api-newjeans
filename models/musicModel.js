// modelo das musicas
const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título da música
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // Referência ao álbum (relacionamento)
  duration: { type: String },  // Duração da música
  createdAt: { type: Date, default: Date.now } // Data de criação no banco
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
