"use server";
import { eq, and, isNull, sum, countDistinct, sql } from "drizzle-orm";
import { db } from "@/db/index";
import { marketsTable, betsTable } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function getActiveMarkets(userAuthority: string) {
  const userBets = alias(betsTable, "userBets");
  return await db
    .select({
      marketid: marketsTable.marketid,
      question: marketsTable.question,
      authority: marketsTable.authority,
      closeTime: marketsTable.closeTime,
      createdAt: marketsTable.createdAt,
      yesPool: marketsTable.yesPool,
      noPool: marketsTable.noPool,
      yesUsers: marketsTable.yesUsers,
      noUsers: marketsTable.noUsers,
    })
    .from(marketsTable)
    .leftJoin(
      userBets,
      and(
        eq(userBets.marketid, marketsTable.marketid),
        eq(userBets.authority, userAuthority)
      )
    )
    .where(and(eq(marketsTable.resolved, false), isNull(userBets.id)))
    .limit(10);
}

export async function getMyBets(userAuthority: string) {
  const markets = await db
    .select({
      marketid: marketsTable.marketid,
      question: marketsTable.question,
      authority: marketsTable.authority,
      createdAt: marketsTable.createdAt,
      resolved: marketsTable.resolved,
      winningOutcome: marketsTable.winningOutcome,
      userOutcome: betsTable.outcome,
      claimed: betsTable.claimed,
    })
    .from(betsTable)
    .innerJoin(marketsTable, eq(betsTable.marketid, marketsTable.marketid))
    .where(eq(betsTable.authority, userAuthority))
    .limit(10);
  return markets;
}

export async function getResolvedMarkets() {
  const markets = await db
    .select({
      marketid: marketsTable.marketid,
      question: marketsTable.question,
      createdAt: marketsTable.createdAt,
      winningOutcome: marketsTable.winningOutcome,
    })
    .from(marketsTable)
    .where(eq(marketsTable.resolved, true))
    .limit(10);
  return markets;
}
