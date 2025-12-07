// permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

router.get('/', permissionController.list);
router.post('/', permissionController.create);
router.put('/:id', permissionController.update);
router.delete('/:id', permissionController.delete);

module.exports = router;
