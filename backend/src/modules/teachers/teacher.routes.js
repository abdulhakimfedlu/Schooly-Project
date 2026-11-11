const express = require('express');
const teacherController = require('./teacher.controller');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');

const router = express.Router();

router.use(authenticate);
router.use(authorize('TEACHER'));

router.get('/me', teacherController.getProfile);
router.get('/me/classes', teacherController.getAssignedClasses);
router.get('/me/subjects', teacherController.getAssignedSubjects);
router.get('/classes/:classId/students', teacherController.getClassStudents);

module.exports = router;
