const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome do membro
  role: { type: String, required: true }, // Papel no grupo (ex: vocalista, dançarina)
  birthDate: { type: Date }, // Data de nascimento
  profileImage: { type: String }, // URL da imagem de perfil
  writtenSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }] // Músicas escritas pelo membro
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
