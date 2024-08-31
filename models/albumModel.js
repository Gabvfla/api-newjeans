const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título do álbum
  releaseDate: { type: Date, required: true }, // Data de lançamento do álbum
  genre: { type: String },  // Gênero predominante do álbum
  coverImage: { type: String }, // URL da imagem de capa do álbum
  createdAt: { type: Date, default: Date.now }, // Data de criação no banco de dados
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }] // Referência para as músicas do álbum
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
