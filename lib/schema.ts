import { pgTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Note: The 'user' table is managed by Neon Auth, but we can reference it
// using the 'id' which is a text-based UUID usually.
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // We use text for Neon Auth IDs
  task: text('task').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

