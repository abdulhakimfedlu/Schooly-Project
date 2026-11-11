const { pgTable, uuid, varchar, timestamp } = require('drizzle-orm/pg-core');
const { users } = require('./users');

exports.teachers = pgTable('teachers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  employeeId: varchar('employee_id', { length: 50 }).notNull().unique(),
  department: varchar('department', { length: 255 }).notNull(),
  specialization: varchar('specialization', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
