// permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');

router.use(auth());

router.get('/', permissionController.list);
router.post('/', permission('manage_roles'), permissionController.create);
router.put('/:id', permission('manage_roles'), permissionController.update);
router.delete('/:id', permission('manage_roles'), permissionController.delete);

module.exports = router;
