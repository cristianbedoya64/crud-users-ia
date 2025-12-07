// roleController.js
const { Role } = require('../models');

module.exports = {
  async list(req, res) {
    const roles = await Role.findAll();
    res.json(roles);
  },
  async create(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del rol es obligatorio.' });
      }
      const exists = await Role.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({ error: 'El rol ya existe.' });
      }
      const role = await Role.create({ name, description });
      res.status(201).json({ message: 'Rol creado exitosamente.', role });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear rol.', details: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El nombre del rol es obligatorio.' });
      }
      await Role.update({ name, description }, { where: { id } });
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado.' });
      }
      res.json({ message: 'Rol actualizado exitosamente.', role });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar rol.', details: err.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    await Role.destroy({ where: { id } });
    res.status(204).send();
  }
};
