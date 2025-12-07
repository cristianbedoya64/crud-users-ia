// rolePermissionRoutes.js
const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');

// Obtener permisos de un rol
router.get('/:roleId/permissions', rolePermissionController.getRolePermissions);
// Asignar permisos a un rol
router.post('/:roleId/permissions', rolePermissionController.assignPermissions);
// Quitar un permiso específico de un rol
router.delete('/:roleId/permissions/:permissionId', rolePermissionController.removePermission);

module.exports = router;
