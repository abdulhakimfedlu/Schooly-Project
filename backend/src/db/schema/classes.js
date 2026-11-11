const { pgTable, uuid, varchar, text, integer, timestamp } = require('drizzle-orm/pg-core');

exports.classes = pgTable('classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  gradeLevel: varchar('grade_level', { length: 50 }),
  section: varchar('section', { length: 10 }),
  academicYear: varchar('academic_year', { length: 20 }).notNull(),
  description: text('description'),
  capacity: integer('capacity'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
