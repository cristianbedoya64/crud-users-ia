// iaPanelRoutes.js
const express = require('express');
const router = express.Router();
const iaPanelController = require('../controllers/iaPanelController');

router.post('/', iaPanelController.getPanel);

module.exports = router;
