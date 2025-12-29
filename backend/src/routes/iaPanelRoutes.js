// iaPanelRoutes.js
const express = require('express');
const router = express.Router();
const iaPanelController = require('../controllers/iaPanelController');
const auth = require('../middleware/auth');

router.use(auth());

router.post('/', iaPanelController.getPanel);

module.exports = router;
