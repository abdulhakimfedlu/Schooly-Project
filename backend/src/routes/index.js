const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const studentRoutes = require('../modules/students/student.routes');
const teacherRoutes = require('../modules/teachers/teacher.routes');
const classRoutes = require('../modules/classes/class.routes');
const subjectRoutes = require('../modules/subjects/subject.routes');
const gradeRoutes = require('../modules/grades/grade.routes');
const termRoutes = require('../modules/academic-terms/term.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
router.use('/subjects', subjectRoutes);
router.use('/grades', gradeRoutes);
router.use('/academic-terms', termRoutes);

module.exports = router;
