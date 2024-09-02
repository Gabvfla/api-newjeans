const express = require("express");
const { addMember, getAllMembers, getMember, updateMember } = require("../controllers/memberController");
const auth = require("../middleware/authMiddleware"); 
const router = express.Router();

// Adicionar novo membro (somente admin se necessário)
router.post("/", auth, addMember);

// Obter todos os membros
router.get("/", getAllMembers);

// Obter um membro específico
router.get("/:id", auth, getMember);

// Atualizar um membro (somente admin se necessário)
router.put("/:id", auth, updateMember);


module.exports = router;
