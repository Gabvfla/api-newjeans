const jwt = require('jsonwebtoken');
require('dotenv').config();

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

module.exports = auth;
