// roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const rolePermissionController = require('../controllers/rolePermissionController');


// Permisos de roles (deben ir antes de los endpoints que usan :id)
router.get('/:roleId/permissions', rolePermissionController.getRolePermissions);
router.post('/:roleId/permissions', rolePermissionController.assignPermissions);
router.delete('/:roleId/permissions/:permissionId', rolePermissionController.removePermission);

router.get('/', roleController.list);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
