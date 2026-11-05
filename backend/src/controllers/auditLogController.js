// auditLogController.js
const { AuditLog, User } = require('../models');
const { Op } = require('sequelize');

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const SENSITIVE_KEYS = /password|token|secret|authorization|cookie|ip|address|document/i;

function safeDetails(value) {
  if (!value) return null;
  let parsed = value;
  if (typeof value === 'string') {
    try { parsed = JSON.parse(value); } catch {
      return value.slice(0, 500).replace(/(password|token|secret|authorization|cookie|ip|address)\s*[:=]\s*[^\s,;]+/gi, '$1: [redacted]');
    }
  }
  if (!parsed || typeof parsed !== 'object') return String(parsed).slice(0, 500);
  const cleanValue = (item) => {
    if (Array.isArray(item)) return item.slice(0, 20).map(cleanValue);
    if (item && typeof item === 'object') {
      const clean = {};
      Object.entries(item).forEach(([key, nested]) => {
        if (!SENSITIVE_KEYS.test(key)) clean[key] = cleanValue(nested);
      });
      return clean;
    }
    return typeof item === 'string' ? item.slice(0, 300) : item;
  };
  return cleanValue(parsed);
}

function resourceFor(log, details) {
  if (details && typeof details === 'object') {
    const value = details.resource || details.entity || details.resourceType;
    if (value) return String(value).slice(0, 100);
  }
  const match = String(log.action || '').match(/(?:user|usuario|role|rol|permission|permiso|session|sesión|audit|auditoría)/i);
  return match ? match[0] : 'sistema';
}

function serialize(log) {
  const details = safeDetails(log.details);
  const result = /failed|failure|denied|error/i.test(log.action)
    || (details && typeof details === 'object' && (details.result === 'failed' || details.success === false))
    ? 'failed' : 'success';
  return {
    id: log.id,
    action: log.action,
    userId: log.userId,
    createdBy: log.createdBy,
    user: log.user ? { id: log.user.id, name: log.user.name, email: log.user.email } : null,
    executor: log.executor ? { id: log.executor.id, name: log.executor.name, email: log.executor.email } : null,
    resource: resourceFor(log, details),
    result,
    date: log.createdAt,
    createdAt: log.createdAt,
    details
  };
}

module.exports = {
  // Registrar un evento de auditoría
  async register(req, res) {
    try {
      const { userId, action, details } = req.body;
      if (!userId || !action) {
        return res.status(400).json({ error: 'userId y action son obligatorios.' });
      }
      const createdBy = req.user ? req.user.id : userId;
      const log = await AuditLog.create({ userId, action, details, createdBy });
      res.status(201).json(log);
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar auditoría.', details: err.message });
    }
  },

  // Consultar logs de auditoría (opcional: filtrar por usuario, acción, fecha)
  async list(req, res) {
    try {
      const { userId, action, from, to } = req.query;
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);
      const where = {};
      if (userId) where.userId = userId;
      if (action) where.action = action;
      if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt[Op.gte] = new Date(from);
        if (to) where.createdAt[Op.lte] = new Date(to);
      }
      const { count, rows } = await AuditLog.findAndCountAll({
        where,
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'executor', attributes: ['id', 'name', 'email'], required: false }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset: (page - 1) * limit,
        distinct: true
      });
      res.json({ total: count, page, limit, pages: Math.ceil(count / limit), logs: rows.map(serialize) });
    } catch (err) {
      console.error('Error audit list:', err);
      res.status(500).json({ error: 'Error al consultar auditoría.', details: err.message });
    }
  }
};
