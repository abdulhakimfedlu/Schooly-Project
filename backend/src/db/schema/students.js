const { pgTable, uuid, varchar, timestamp } = require('drizzle-orm/pg-core');
const { users } = require('./users');
const { classes } = require('./classes');

exports.students = pgTable('students', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  studentId: varchar('student_id', { length: 50 }).notNull().unique(),
  classId: uuid('class_id').references(() => classes.id, { onDelete: 'set null' }),
  department: varchar('department', { length: 255 }),
  enrollmentDate: timestamp('enrollment_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
