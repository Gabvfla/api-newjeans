const express = require('express');
const { installDatabase } = require('../controllers/installController');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Rota para instalação do banco de dados
router.get('/', installDatabase);

module.exports = router;