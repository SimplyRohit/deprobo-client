"use server";
import { eq, and, isNull, gt, ne } from "drizzle-orm";
import { db } from "@/db/index";
import { marketsTable, betsTable } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function getActiveMarkets(userAuthority: string) {
  const userBets = alias(betsTable, "userBets");
  const currentTime = Math.floor(Date.now() / 1000);
  try {
    return await db
      .select({
        marketid: marketsTable.marketid,
        question: marketsTable.question,
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
      .where(
        and(
          eq(marketsTable.resolved, false),
          isNull(userBets.id),
          gt(marketsTable.closeTime, currentTime),
          ne(marketsTable.authority, userAuthority)
        )
      )
      .limit(10);
  } catch (error) {
    console.error(error);
    return "failed to get markets";
  }
}

export async function getMyBets(userAuthority: string) {
  try {
    return await db
      .select({
        marketid: marketsTable.marketid,
        question: marketsTable.question,
        createdAt: marketsTable.createdAt,
        resolved: marketsTable.resolved,
        winningOutcome: marketsTable.winningOutcome,
        userOutcome: betsTable.outcome,
        claimed: betsTable.claimed,
        yesUsers: marketsTable.yesUsers,
        noUsers: marketsTable.noUsers,
      })
      .from(betsTable)
      .innerJoin(marketsTable, eq(betsTable.marketid, marketsTable.marketid))
      .where(eq(betsTable.authority, userAuthority))
      .limit(10);
  } catch (error) {
    console.error(error);
    return "failed to get markets";
  }
}

export async function getResolvedMarkets() {
  try {
    return await db
      .select({
        marketid: marketsTable.marketid,
        question: marketsTable.question,
        createdAt: marketsTable.createdAt,
        winningOutcome: marketsTable.winningOutcome,
        resolved: marketsTable.resolved,
        authority: marketsTable.authority,
        yesUsers: marketsTable.yesUsers,
        noUsers: marketsTable.noUsers,
      })
      .from(marketsTable)
      .limit(10);
  } catch (error) {
    console.error(error);
    return "failed to get markets";
  }
}
