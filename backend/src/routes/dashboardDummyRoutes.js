// dashboardDummyRoutes.js
const express = require('express');
const router = express.Router();

router.get('/audit', (req, res) => {
  res.json([
    { action: 'login', details: 'Usuario admin inició sesión', createdAt: new Date() },
    { action: 'create_user', details: 'Se creó usuario Juan', createdAt: new Date() },
    { action: 'delete_role', details: 'Rol auditor eliminado', createdAt: new Date() }
  ]);
});

router.get('/security-alerts', (req, res) => {
  res.json([
    { message: 'Intento fallido de acceso por usuario juan', date: 'Hoy' },
    { message: 'Cambio de permisos críticos en rol admin', date: 'Ayer' }
  ]);
});

router.get('/change-history', (req, res) => {
  res.json([
    { action: 'Creación de usuario ana', date: new Date(Date.now() - 3600 * 1000) },
    { action: 'Eliminación de rol auditor', date: new Date(Date.now() - 7200 * 1000) }
  ]);
});

router.get('/system-status', (req, res) => {
  res.json({ api: 'online', ia: 'online', cloud: 'online' });
});

router.get('/user-growth', (req, res) => {
  res.json([
    { date: '01/11', users: 10 },
    { date: '08/11', users: 15 },
    { date: '15/11', users: 22 },
    { date: '22/11', users: 30 },
    { date: '29/11', users: 40 }
  ]);
});

router.get('/module-access', (req, res) => {
  res.json([
    { module: 'Usuarios', access: 40 },
    { module: 'Roles', access: 25 },
    { module: 'Permisos', access: 18 },
    { module: 'Auditoría', access: 12 }
  ]);
});

module.exports = router;
