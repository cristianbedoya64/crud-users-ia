// permissionController.js
const { Permission, AuditLog } = require('../models');

module.exports = {
  async list(req, res) {
    const permissions = await Permission.findAll();
    res.json(permissions);
  },
  async create(req, res) {
    try {
      const { name, description, userId } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del permiso es obligatorio.' });
      }
      const exists = await Permission.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({ error: 'El permiso ya existe.' });
      }
      const permission = await Permission.create({ name, description });
      // Auditoría
      if (userId) {
        await AuditLog.create({
          userId,
          action: 'create_permission',
          details: `Permiso creado: ${permission.name}`
        });
      }
      res.status(201).json({ message: 'Permiso creado exitosamente.', permission });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear permiso.', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, userId } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del permiso es obligatorio.' });
      }
      await Permission.update({ name, description }, { where: { id } });
      const permission = await Permission.findByPk(id);
      if (!permission) {
        return res.status(404).json({ error: 'Permiso no encontrado.' });
      }
      // Auditoría
      if (userId) {
        await AuditLog.create({
          userId,
          action: 'update_permission',
          details: `Permiso actualizado: ${permission.name}`
        });
      }
      res.json({ message: 'Permiso actualizado exitosamente.', permission });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar permiso.', details: err.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    const permission = await Permission.findByPk(id);
    await Permission.destroy({ where: { id } });
    // Auditoría
    if (permission && userId) {
      await AuditLog.create({
        userId,
        action: 'delete_permission',
        details: `Permiso eliminado: ${permission.name}`
      });
    }
    res.status(204).send();
  }
};
