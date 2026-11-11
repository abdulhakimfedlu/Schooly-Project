const { pgTable, uuid, varchar, date, boolean, timestamp } = require('drizzle-orm/pg-core');

exports.academicTerms = pgTable('academic_terms', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  academicYear: varchar('academic_year', { length: 20 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  isActive: boolean('is_active').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
