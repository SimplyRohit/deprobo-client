import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const marketsTable = pgTable("markets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  question: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 50 }).notNull(),
  closeTime: integer().notNull(),
  createdAt: integer().notNull(),
  resolved: integer().notNull().default(0),
  winningOutcome: integer().notNull().default(0),
  yesPool: varchar({ length: 44 }).notNull(),
  noPool: varchar({ length: 44 }).notNull(),
  totalYes: integer().notNull().default(0),
  totalNo: integer().notNull().default(0),
  yesUsers: integer().notNull().default(0),
  noUsers: integer().notNull().default(0),
  authority: varchar({ length: 44 }).notNull(),
  bet: integer().notNull().default(0),
});

export const betsTable = pgTable("bets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authority: varchar({ length: 44 }).notNull(),
  market: varchar({ length: 44 }).notNull(),
  amount: integer().notNull(),
  outcome: integer().notNull(),
  claimed: integer().notNull().default(0),
});
