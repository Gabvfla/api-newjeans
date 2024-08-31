const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título da música
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // Referência ao álbum
  duration: { type: String },  // Duração da música
  writtenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }], // Membros que escreveram a música
  createdAt: { type: Date, default: Date.now } // Data de criação no banco
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;