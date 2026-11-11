const express = require('express');
const gradeController = require('./grade.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

const router = express.Router();

router.use(authenticate);

router.post('/', authorize('TEACHER'), gradeController.createGrade);
router.patch('/:gradeId', authorize('TEACHER'), gradeController.updateGrade);
router.get('/', gradeController.getGrades);

module.exports = router;
