// auditLogRoutes.js
const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');

router.use(auth());

// Registrar evento de auditoría
router.post('/', auditLogController.register);

// Consultar logs de auditoría (con filtros)
router.get('/', permission('view_audit'), auditLogController.list);

module.exports = router;
