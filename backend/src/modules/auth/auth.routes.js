const express = require('express');
const authController = require('./auth.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;
