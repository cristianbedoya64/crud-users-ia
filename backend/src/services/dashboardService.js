const axios = require('axios');
const { Op } = require('sequelize');
const { User, Role, UserRole, AuditLog, sequelize } = require('../models');

const RECENT_DAYS = 30;
const RECENT_LIMIT = 10;
const AUDIT_LIMIT = 20;
const ROLE_LIMIT = 20;
const ACTION_LIMIT = 20;
const ACTIVITY_LIMIT = 31;
const LOGIN_LIMIT = 5;
const USER_ACTIVITY_LIMIT = 31;
const MODULES = [
  { module: 'Usuarios', actions: ['create_user', 'read_user', 'update_user', 'delete_user', 'restore_user'] },
  { module: 'Roles', actions: ['create_role', 'update_role', 'delete_role'] },
  { module: 'Permisos', actions: ['create_permission', 'update_permission', 'delete_permission'] },
  { module: 'Auditoría', actions: ['failed_access', 'view_audit'] },
  { module: 'Autenticación', actions: ['login', 'refresh_token', 'logout'] }
];

function sinceDays(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function getModuleActivity(actionRows) {
  const counts = new Map(actionRows.map(row => [row.action, Number(row.count) || 0]));
  return MODULES
    .map(({ module, actions }) => ({
      module,
      access: actions.reduce((total, action) => total + (counts.get(action) || 0), 0)
    }))
    .filter(item => item.access > 0);
}

async function getRoleDistribution() {
  const rows = await UserRole.findAll({
    attributes: [
      'roleId',
      [sequelize.fn('COUNT', sequelize.col('userId')), 'count']
    ],
    group: ['roleId'],
    order: [[sequelize.literal('"count"'), 'DESC']],
    limit: ROLE_LIMIT,
    raw: true
  });

  if (!rows.length) return [];
  const roles = await Role.findAll({
    where: { id: { [Op.in]: rows.map(row => row.roleId) } },
    attributes: ['id', 'name'],
    raw: true
  });
  const names = new Map(roles.map(role => [String(role.id), role.name]));
  return rows.map(row => ({
    roleId: row.roleId,
    role: names.get(String(row.roleId)) || 'unknown',
    count: Number(row.count) || 0
  }));
}

async function getLastLogins() {
  const rows = await AuditLog.findAll({
    where: { action: 'login' },
    attributes: ['id', 'userId', 'createdAt'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['name', 'email']
    }],
    order: [['createdAt', 'DESC']],
    limit: LOGIN_LIMIT
  });

  return rows.map(row => ({
    id: row.id,
    user: row.user?.name || row.user?.email || 'Usuario no disponible',
    date: row.createdAt
  }));
}

async function getServicesStatus() {
  const database = { status: 'online' };
  try {
    await sequelize.authenticate();
  } catch (error) {
    database.status = 'offline';
  }

  const ia = { status: 'offline' };
  try {
    const iaUrl = process.env.IA_PANEL_URL || 'http://ia-panel:5001/ia-panel';
    await axios.post(iaUrl, { num_roles: 1, is_admin: 0, activity_score: 10 }, { timeout: 1500 });
    ia.status = 'online';
  } catch (error) {
    // The dashboard remains useful when the optional IA service is unavailable.
  }

  return {
    api: { status: 'online' },
    database,
    ia
  };
}

async function getSummary() {
  const recentSince = sinceDays(RECENT_DAYS);
  const [
    total,
    active,
    inactive,
    recentUserRows,
    roleDistribution,
    recentAudit,
    actionRows,
    failedAccesses,
    activityRows,
    userActivityRows,
    lastLogins,
    services
  ] = await Promise.all([
    User.count(),
    User.count({ where: { status: 'active' } }),
    User.count({ where: { status: 'inactive' } }),
    User.findAll({
      where: { createdAt: { [Op.gte]: recentSince } },
      attributes: ['id', 'name', 'email', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: RECENT_LIMIT,
      raw: true
    }),
    getRoleDistribution(),
    AuditLog.findAll({
      attributes: ['id', 'userId', 'action', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: AUDIT_LIMIT,
      raw: true
    }),
    AuditLog.findAll({
      attributes: ['action', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['action'],
      order: [[sequelize.literal('"count"'), 'DESC']],
      limit: ACTION_LIMIT,
      raw: true
    }),
    AuditLog.count({ where: { action: 'failed_access' } }),
    AuditLog.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { createdAt: { [Op.gte]: recentSince } },
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.literal('"date"'), 'ASC']],
      limit: ACTIVITY_LIMIT,
      raw: true
    }),
    User.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { createdAt: { [Op.gte]: recentSince } },
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.literal('"date"'), 'ASC']],
      limit: USER_ACTIVITY_LIMIT,
      raw: true
    }),
    getLastLogins(),
    getServicesStatus()
  ]);

  return {
    generatedAt: new Date().toISOString(),
    users: {
      total,
      active,
      inactive,
      recent: recentUserRows
    },
    roles: roleDistribution,
    audit: {
      recent: recentAudit,
      byAction: actionRows.map(row => ({ action: row.action, count: Number(row.count) || 0 })),
      failedAccess: failedAccesses
    },
    moduleActivity: getModuleActivity(actionRows),
    lastLogins,
    userActivity: userActivityRows.map(row => ({
      date: row.date,
      count: Number(row.count) || 0
    })),
    activity: activityRows.map(row => ({
      date: row.date,
      count: Number(row.count) || 0
    })),
    services
  };
}

module.exports = { getSummary };
