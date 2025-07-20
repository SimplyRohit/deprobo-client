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
      category: marketsTable.category,
      closeTime: marketsTable.closeTime,
      createdAt: marketsTable.createdAt,
      authority: marketsTable.authority,
      yesPool: sql<number>`
        SUM(
          CASE WHEN ${betsTable.outcome} = true THEN ${betsTable.amount}
               ELSE 0 END
        )
      `,
      noPool: sql<number>`
        SUM(
          CASE WHEN ${betsTable.outcome} = false THEN ${betsTable.amount}
               ELSE 0 END
        )
      `,
      yesUsers: sql<number>`
        COUNT(
          DISTINCT CASE WHEN ${betsTable.outcome} = true
                        THEN ${betsTable.authority}
                        ELSE NULL END
        )
      `,
      noUsers: sql<number>`
        COUNT(
          DISTINCT CASE WHEN ${betsTable.outcome} = false
                        THEN ${betsTable.authority}
                        ELSE NULL END
        )
      `,
    })
    .from(marketsTable)
    .leftJoin(betsTable, eq(betsTable.marketid, marketsTable.marketid))
    .leftJoin(
      userBets,
      and(
        eq(userBets.marketid, marketsTable.marketid),
        eq(userBets.authority, userAuthority)
      )
    )
    .where(and(eq(marketsTable.resolved, false), isNull(userBets.id)))
    .groupBy(
      marketsTable.marketid,
      marketsTable.question,
      marketsTable.category,
      marketsTable.closeTime,
      marketsTable.createdAt,
      marketsTable.authority
    )
    .limit(10);
}

export async function getMyBets(userAuthority: string) {
  const markets = await db
    .select({
      marketid: marketsTable.marketid,
      question: marketsTable.question,
      category: marketsTable.category,
      resolved: marketsTable.resolved,
      winningOutcome: marketsTable.winningOutcome,
      userOutcome: betsTable.outcome,
      amount: betsTable.amount,
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
    .select()
    .from(marketsTable)
    .where(eq(marketsTable.resolved, true))
    .limit(10);
  return markets;
}
