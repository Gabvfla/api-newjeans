const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel'); // Adicione a importação do modelo

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("Token recebido:", token);
  
  if (!token) return res.status(401).json({ msg: 'Sem token, autorização negada' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("Erro na verificação do token:", err);
    res.status(401).json({ msg: 'Token inválido' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
      const adminUser = await User.findById(req.user); // Verificar o ID do usuário logado
      if (!adminUser || !adminUser.isAdmin) {
          return res.status(403).json({ msg: "Acesso negado. Somente administradores podem realizar esta ação!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" });
      }
      next(); // Se for admin, passa para a próxima função
  } catch (err) {
      return res.status(500).json({ msg: "Erro ao verificar as credenciais de administrador", error: err.message });
  }
};

const isAdminOrUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user); // Verificar o ID do usuário logado

    // Verifica se o usuário está autenticado e existe no banco de dados
    if (!user) {
      return res.status(403).json({ msg: "Acesso negado. Usuário não encontrado." });
    }

    // Verifica se o usuário é o mesmo que está tentando acessar o recurso
    if (user._id.toString() === req.params.id || user.isAdmin) {
      return next(); // Se for o próprio usuário ou um administrador, passa para a próxima função
    } else {
      return res.status(403).json({ msg: "Acesso negado. Você só pode editar seu próprio perfil." });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Erro ao verificar as credenciais", error: err.message });
  }
};

module.exports = { auth, isAdmin, isAdminOrUser };
