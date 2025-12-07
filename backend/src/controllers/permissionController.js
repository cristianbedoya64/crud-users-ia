// permissionController.js
const { Permission } = require('../models');

module.exports = {
  async list(req, res) {
    const permissions = await Permission.findAll();
    res.json(permissions);
  },
  async create(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del permiso es obligatorio.' });
      }
      const exists = await Permission.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({ error: 'El permiso ya existe.' });
      }
      const permission = await Permission.create({ name, description });
      res.status(201).json({ message: 'Permiso creado exitosamente.', permission });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear permiso.', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del permiso es obligatorio.' });
      }
      await Permission.update({ name, description }, { where: { id } });
      const permission = await Permission.findByPk(id);
      if (!permission) {
        return res.status(404).json({ error: 'Permiso no encontrado.' });
      }
      res.json({ message: 'Permiso actualizado exitosamente.', permission });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar permiso.', details: err.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    await Permission.destroy({ where: { id } });
    res.status(204).send();
  }
};
