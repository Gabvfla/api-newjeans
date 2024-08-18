// controle dos usuários que estão no banco de dados
const User = require('../models/userModel');

// Obter dados do usuário autenticado
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// Atualizar dados do usuário autenticado
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    // Atualizar informações
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// Obter todos os usuários (somente para admin)
exports.getAllUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ msg: 'Acesso negado. Somente administradores podem acessar.' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ msg: 'Acesso negado. Somente administradores podem acessar.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    res.json({ msg: 'Usuário deletado' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};