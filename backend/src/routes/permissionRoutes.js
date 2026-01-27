// permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');
const audit = require('../middleware/audit');

router.use(auth());

router.get('/', permissionController.list);
router.post('/', permission('manage_roles'), audit('create_permission', req => `Creación de permiso: ${req.body.name}`), permissionController.create);
router.put('/:id', permission('manage_roles'), audit('update_permission', req => `Actualización de permiso: ${req.body.name || req.params.id}`), permissionController.update);
router.delete('/:id', permission('manage_roles'), audit('delete_permission', req => `Eliminación de permiso: ${req.params.id}`), permissionController.delete);

module.exports = router;
