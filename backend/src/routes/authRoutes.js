const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login de usuario y entrega de tokens
router.post('/login', authController.login);

// Rotación/renovación de tokens
router.post('/refresh', authController.refresh);

// Logout (revoca refresh token)
router.post('/logout', authController.logout);

module.exports = router;
