// roleRoutes.js
const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');
const rolePermissionController = require('../controllers/rolePermissionController');
const audit = require('../middleware/audit');
const permission = require('../middleware/permission');

// Permisos de roles (deben ir antes de los endpoints que usan :id)
router.get('/:roleId/permissions', rolePermissionController.getRolePermissions);
router.post('/:roleId/permissions', permission('assign_permission'), rolePermissionController.assignPermissions);
router.delete('/:roleId/permissions/:permissionId', rolePermissionController.removePermission);

router.get('/', roleController.list);
router.post('/', permission('create_role'), audit('create_role', req => `Creación de rol: ${req.body.name}`), roleController.create);
router.put('/:id', audit('update_role', req => `Actualización de rol: ${req.body.name || req.params.id}`), roleController.update);
router.delete('/:id', audit('delete_role', req => `Eliminación de rol: ${req.params.id}`), roleController.delete);

module.exports = router;
