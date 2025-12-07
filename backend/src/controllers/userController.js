// userController.js
const { User, AuditLog } = require('../models');

module.exports = {
  async list(req, res) {
    const users = await User.findAll();
    res.json(users);
  },
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        return res.status(409).json({ error: 'El email ya está registrado.' });
      }
      const user = await User.create({ name, email, password });
      // Registrar evento de auditoría
      await AuditLog.create({
        userId: user.id,
        action: 'create_user',
        details: `Usuario creado: ${user.name} (${user.email})`
      });
      res.status(201).json({ message: 'Usuario creado exitosamente.', user });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear usuario.', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios.' });
      }
      await User.update({ name, email, password }, { where: { id } });
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      // Registrar evento de auditoría
      await AuditLog.create({
        userId: user.id,
        action: 'update_user',
        details: `Usuario actualizado: ${user.name} (${user.email})`
      });
      res.json({ message: 'Usuario actualizado exitosamente.', user });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar usuario.', details: err.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await User.destroy({ where: { id } });
    // Registrar evento de auditoría
    if (user) {
      await AuditLog.create({
        userId: user.id,
        action: 'delete_user',
        details: `Usuario eliminado: ${user.name} (${user.email})`
      });
    }
    res.status(204).send();
  }
};
