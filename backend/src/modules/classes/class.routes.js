const express = require('express');
const classController = require('./class.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', classController.getAllClasses);
router.get('/:classId', classController.getClassById);

module.exports = router;
