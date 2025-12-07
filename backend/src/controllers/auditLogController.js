// auditLogController.js
const { AuditLog } = require('../models');

module.exports = {
  // Registrar un evento de auditoría
  async register(req, res) {
    try {
      const { userId, action, details } = req.body;
      if (!userId || !action) {
        return res.status(400).json({ error: 'userId y action son obligatorios.' });
      }
      const log = await AuditLog.create({ userId, action, details });
      res.status(201).json(log);
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar auditoría.', details: err.message });
    }
  },

  // Consultar logs de auditoría (opcional: filtrar por usuario, acción, fecha)
  async list(req, res) {
    try {
      const { userId, action, from, to } = req.query;
      const where = {};
      if (userId) where.userId = userId;
      if (action) where.action = action;
      if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt[Op.gte] = new Date(from);
        if (to) where.createdAt[Op.lte] = new Date(to);
      }
      const logs = await AuditLog.findAll({ where, order: [['createdAt', 'DESC']] });
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: 'Error al consultar auditoría.', details: err.message });
    }
  }
};
