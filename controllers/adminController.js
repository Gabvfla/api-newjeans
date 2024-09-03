// Irei criar um controller para a parte dos adms.
const User = require("../models/userModel");


// Obter todos os usuários (somente para admin)
exports.getAllUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem acessar." });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

// Comando para um admin criar outro admin
exports.createAdmin = async (req, res) => {
    try {
        const adminUser = await User.findById(req.user);
        if (!adminUser || !adminUser.isAdmin) {
            return res.status(403).json({ msg: "Acesso negado. Somente administradores podem acessar." });
        }

        const { name, email, password } = req.body;

        // Verificar se o usuário já existe pelo email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Usuário já existe" });
        }

        // Criar o novo admin
        const newAdmin = new User({
            name,
            email,
            password,
            isAdmin: true 
        });

        // Salvar o novo admin no banco de dados
        await newAdmin.save();

        res.json({ msg: "Admin criado com sucesso" });
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor" });
    }
};
