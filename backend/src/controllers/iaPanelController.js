// iaPanelController.js
// El BFF calcula en el servidor los indicadores de comportamiento del usuario
// y envía al servicio de IA únicamente esos tres valores numéricos. Ningún dato
// personal (nombre, correo, documento, IP) sale hacia el servicio de IA, y los
// valores que envíe el cliente se ignoran para evitar manipulación.
const axios = require('axios');
const { Op } = require('sequelize');
const { User, Role, AuditLog } = require('../models');

// Base URL del servicio IA; en Docker debe apuntar al nombre del servicio.
const IA_PANEL_URL = process.env.IA_PANEL_URL || 'http://ia-panel:5001/ia-panel';
const ACTIVITY_DAYS = 30;

async function buildFeatures(userId) {
  const user = await User.findByPk(userId, {
    attributes: ['id'],
    include: [{ model: Role, attributes: ['name'], through: { attributes: [] } }]
  });
  if (!user) return null;
  const roleNames = (user.Roles || []).map(r => r.name);
  const since = new Date(Date.now() - ACTIVITY_DAYS * 24 * 60 * 60 * 1000);
  const activity = await AuditLog.count({ where: { userId, createdAt: { [Op.gte]: since } } });
  return {
    num_roles: roleNames.length,
    is_admin: roleNames.includes('admin') ? 1 : 0,
    activity_score: activity
  };
}

module.exports = {
  buildFeatures,
  async getPanel(req, res) {
    try {
      // Por defecto se analiza al usuario autenticado; un administrador puede indicar otro userId.
      const requested = Number.parseInt(req.body?.userId, 10);
      const isAdmin = Array.isArray(req.user?.roles) && req.user.roles.includes('admin');
      const userId = Number.isInteger(requested) && isAdmin ? requested : req.user.id;

      const features = await buildFeatures(userId);
      if (!features) return res.status(404).json({ error: 'Usuario no encontrado.' });

      const response = await axios.post(IA_PANEL_URL, features, { timeout: 5000 });
      res.json({ ...response.data, features });
    } catch (err) {
      // El detalle técnico se registra solo en el servidor; al cliente se le da un mensaje genérico.
      console.error('Error panel IA:', err?.message);
      res.status(502).json({ error: 'El servicio de análisis no está disponible en este momento.' });
    }
  }
};
