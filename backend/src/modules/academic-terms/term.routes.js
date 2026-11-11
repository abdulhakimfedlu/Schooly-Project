const express = require('express');
const termController = require('./term.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', termController.getAllTerms);
router.get('/active', termController.getActiveTerm);

module.exports = router;
