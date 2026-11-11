const { pgTable, uuid, varchar, decimal, timestamp } = require('drizzle-orm/pg-core');
const { students } = require('./students');
const { subjects } = require('./subjects');
const { teachers } = require('./teachers');
const { classes } = require('./classes');
const { academicTerms } = require('./academicTerms');

exports.grades = pgTable('grades', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
  classId: uuid('class_id').notNull().references(() => classes.id, { onDelete: 'cascade' }),
  academicTermId: uuid('academic_term_id').notNull().references(() => academicTerms.id, { onDelete: 'cascade' }),
  assessmentName: varchar('assessment_name', { length: 100 }).notNull(),
  marksObtained: decimal('marks_obtained', { precision: 5, scale: 2 }).notNull(),
  maximumMarks: decimal('maximum_marks', { precision: 5, scale: 2 }).notNull(),
  percentage: decimal('percentage', { precision: 5, scale: 2 }),
  letterGrade: varchar('letter_grade', { length: 5 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
