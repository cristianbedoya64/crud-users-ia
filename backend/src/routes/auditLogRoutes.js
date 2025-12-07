// auditLogRoutes.js
const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');

// Registrar evento de auditoría
router.post('/', auditLogController.register);

// Consultar logs de auditoría (con filtros)
router.get('/', auditLogController.list);

module.exports = router;
