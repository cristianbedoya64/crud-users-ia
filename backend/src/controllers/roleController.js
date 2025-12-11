// roleController.js
const { Role, AuditLog } = require('../models');

module.exports = {
  async list(req, res) {
    const roles = await Role.findAll();
    res.json(roles);
  },
  async create(req, res) {
    try {
      const { name, description, userId } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del rol es obligatorio.' });
      }
      const exists = await Role.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({ error: 'El rol ya existe.' });
      }
      const createdBy = req.user ? req.user.id : (userId || null);
      const role = await Role.create({ name, description, createdBy });
      // Auditoría
      if (userId) {
        await AuditLog.create({
          userId,
          action: 'create_role',
          details: `Rol creado: ${role.name}`
        });
      }
      res.status(201).json({ message: 'Rol creado exitosamente.', role });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear rol.', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, userId } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del rol es obligatorio.' });
      }
      const updatedBy = req.user ? req.user.id : (userId || null);
      await Role.update({ name, description, updatedBy }, { where: { id } });
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado.' });
      }
      // Auditoría
      if (userId) {
        await AuditLog.create({
          userId,
          action: 'update_role',
          details: `Rol actualizado: ${role.name}`
        });
      }
      res.json({ message: 'Rol actualizado exitosamente.', role });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar rol.', details: err.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    const role = await Role.findByPk(id);
    await Role.destroy({ where: { id } });
    // Auditoría
    if (role && userId) {
      await AuditLog.create({
        userId,
        action: 'delete_role',
        details: `Rol eliminado: ${role.name}`
      });
    }
    res.status(204).send();
  }
};
