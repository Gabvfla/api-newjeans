// autenticação de usuário

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuário já existe' });

    user = new User({ name, email, password });
    await user.save();

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Senha incorreta' });

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};
