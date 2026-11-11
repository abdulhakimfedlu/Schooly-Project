const express = require('express');
const subjectController = require('./subject.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', subjectController.getAllSubjects);
router.get('/:subjectId', subjectController.getSubjectById);

module.exports = router;
