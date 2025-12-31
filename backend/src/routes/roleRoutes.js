// roleRoutes.js
const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');
const rolePermissionController = require('../controllers/rolePermissionController');
const audit = require('../middleware/audit');
const permission = require('../middleware/permission');
const auth = require('../middleware/auth');

// Todas las rutas de roles requieren autenticación
router.use(auth());

// Permisos de roles (deben ir antes de los endpoints que usan :id)
router.get('/:roleId/permissions', rolePermissionController.getRolePermissions);
router.post('/:roleId/permissions', permission('manage_roles'), rolePermissionController.assignPermissions);
router.delete('/:roleId/permissions/:permissionId', permission('manage_roles'), rolePermissionController.removePermission);

router.get('/', permission('manage_roles'), roleController.list);
router.post('/', permission('manage_roles'), audit('create_role', req => `Creación de rol: ${req.body.name}`), roleController.create);
router.put('/:id', permission('manage_roles'), audit('update_role', req => `Actualización de rol: ${req.body.name || req.params.id}`), roleController.update);
router.delete('/:id', permission('manage_roles'), audit('delete_role', req => `Eliminación de rol: ${req.params.id}`), roleController.delete);

module.exports = router;
