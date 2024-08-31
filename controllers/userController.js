// controle dos usuários que estão no banco de dados
const User = require("../models/userModel");

// Obter dados do usuário autenticado
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

// Atualizar dados do usuário autenticado
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica o ID do usuário autenticado
    const authenticatedUserId = req.params.id;
    const requestedUserId = req.params.id;

    // Busca o usuário autenticado
    const adminUser = await User.findById(authenticatedUserId);
    if (!adminUser) return res.status(404).json({ msg: "Usuário autenticado não encontrado" });

    // Verifica se o usuário autenticado é admin
    const isAdmin = adminUser.isAdmin;

    // Permitir atualização apenas se for o próprio usuário ou um admin
    if (!isAdmin && authenticatedUserId !== requestedUserId) {
      return res.status(403).json({ msg: "Acesso negado. Você só pode atualizar seu próprio perfil." });
    }

    // Busca o usuário a ser atualizado
    let user = await User.findById(requestedUserId);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    // Atualizar informações
    user.name = name || user.name;
    user.email = email || user.email;

    // Atualizar senha, se fornecida
    if (password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};


exports.deleteUser = async (req, res) => {
    try {
        const adminUser = await User.findById(req.user);
        
        // Verifica se o usuário logado é um administrador ou se está tentando deletar seu próprio perfil
        if (!adminUser || (!adminUser.isAdmin && adminUser._id.toString() !== req.params.id)) {
            return res.status(403).json({ msg: 'Acesso negado. Você só pode deletar seu próprio perfil.' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

        res.json({ msg: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

