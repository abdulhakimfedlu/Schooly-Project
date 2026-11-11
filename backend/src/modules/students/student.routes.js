const express = require('express');
const studentController = require('./student.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

const router = express.Router();

router.use(authenticate);
router.use(authorize('STUDENT'));

router.get('/me', studentController.getProfile);
router.get('/me/grades', studentController.getMyGrades);

module.exports = router;
