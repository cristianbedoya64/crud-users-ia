// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Permission, RolePermission, sequelize } = require('../models');

router.use(auth());

// Top permissions based on role-permission assignments
router.get('/top-permissions', async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(parseInt(req.query.limit || '5', 10), 50));
    const counts = await RolePermission.findAll({
      attributes: [
        'permissionId',
        [sequelize.fn('COUNT', sequelize.col('roleId')), 'count']
      ],
      group: ['permissionId']
    });

    const countMap = new Map(
      counts.map(row => [row.permissionId, Number(row.get('count')) || 0])
    );

    const perms = await Permission.findAll();
    const summary = perms
      .map(p => ({ name: p.name, count: countMap.get(p.id) || 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener permisos más usados.', details: err.message });
  }
});

module.exports = router;
