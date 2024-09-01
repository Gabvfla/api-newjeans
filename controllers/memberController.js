// controllers/memberController.js
const Member = require('../models/memberModel');
const User = require('../models/userModel');

// Adicionar um novo membro
exports.addMember = async (req, res) => {
    const { name, position, role, profileImage } = req.body;

    try {
        const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem adicionar membros e olhe lá !!" });
    }
        const newMember = new Member({ name, position, role, profileImage });
        const member = await newMember.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao adicionar o membro', error: err.message });
    }
};

// Obter todos os membros
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar os membros', error: err.message });
    }
};

// Obter um membro específico
exports.getMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ msg: 'Membro não encontrado' });
        res.json(member);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar o membro', error: err.message });
    }
};

// Atualizar um membro
exports.updateMember = async (req, res) => {
    const { name, position, role, profileImage } = req.body;

    try {
        const adminUser = await User.findById(req.user);
    if (!adminUser || !adminUser.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acesso negado. Somente administradores podem editar as membros." });
    }
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ msg: 'Membro não encontrado' });

        member.name = name || member.name;
        member.position = position || member.position;
        member.role = role || member.role;
        member.profileImage = profileImage || member.profileImage;

        await member.save();
        res.json(member);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar o membro', error: err.message });
    }
};
