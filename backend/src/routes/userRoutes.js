// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permission = require('../middleware/permission');
const audit = require('../middleware/audit');

router.get('/', userController.list);
router.get('/:id', userController.detail);
router.post('/', permission('create_user'), audit('create_user', req => `Creación de usuario: ${req.body.email}`), userController.create);
router.put('/:id', audit('update_user', req => `Actualización de usuario: ${req.body.email || req.params.id}`), userController.update);
router.delete('/:id', permission('delete_user'), audit('delete_user', req => `Desactivación de usuario: ${req.params.id}`), userController.deleteUser);
router.post('/:id/restore', permission('update_user'), audit('restore_user', req => `Restauración de usuario: ${req.params.id}`), userController.restore);

module.exports = router;
