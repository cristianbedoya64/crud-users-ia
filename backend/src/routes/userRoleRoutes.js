// userRoleRoutes.js
const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');

router.use(auth());

router.get('/:userId/roles', permission('manage_roles'), userRoleController.getUserRoles);
router.post('/:userId/roles', permission('manage_roles'), userRoleController.assignRoles);
router.delete('/:userId/roles/:roleId', permission('manage_roles'), userRoleController.removeRole);

module.exports = router;
