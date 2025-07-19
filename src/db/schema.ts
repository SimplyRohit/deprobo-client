// drizzle/schema.ts
import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const marketsTable = pgTable("markets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  marketid: varchar({ length: 50 }).notNull().unique(),
  question: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 50 }).notNull(),
  closeTime: integer().notNull(),
  createdAt: integer().notNull(),
  authority: varchar({ length: 44 }).notNull(),
  resolved: boolean().notNull().default(false),
  winningOutcome: boolean().notNull().default(false),
  totalYes: integer().notNull().default(0),
  totalNo: integer().notNull().default(0),
});

export const betsTable = pgTable("bets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authority: varchar({ length: 50 }).notNull(),
  marketid: varchar({ length: 50 })
    .notNull()
    .references(() => marketsTable.marketid),
  amount: integer().notNull(),
  outcome: boolean().notNull(),
  claimed: boolean().notNull().default(false),
});
