// userRoleRoutes.js
const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

router.get('/:userId/roles', userRoleController.getUserRoles);
router.post('/:userId/roles', userRoleController.assignRoles);
router.delete('/:userId/roles/:roleId', userRoleController.removeRole);

module.exports = router;
