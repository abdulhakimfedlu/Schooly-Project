const { pgTable, uuid, timestamp, primaryKey } = require('drizzle-orm/pg-core');
const { teachers } = require('./teachers');
const { classes } = require('./classes');
const { subjects } = require('./subjects');

exports.teacherAssignments = pgTable('teacher_assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  teacherId: uuid('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
  classId: uuid('class_id').notNull().references(() => classes.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
