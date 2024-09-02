const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título da playlist
  musics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }], // Músicas na playlist
  description: { type: String, required: true }, // Descrição da playlist
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}], // Usuário que criou a playlist
  createdAt: { type: Date, default: Date.now }, // Data de criação
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
