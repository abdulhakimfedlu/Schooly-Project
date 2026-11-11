const { users, roleEnum } = require('./users');
const { students } = require('./students');
const { teachers } = require('./teachers');
const { classes } = require('./classes');
const { subjects } = require('./subjects');
const { teacherAssignments } = require('./teacherAssignments');
const { academicTerms } = require('./academicTerms');
const { grades } = require('./grades');

module.exports = {
  users,
  roleEnum,
  students,
  teachers,
  classes,
  subjects,
  teacherAssignments,
  academicTerms,
  grades,
};
