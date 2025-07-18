ALTER TABLE "bets" ALTER COLUMN "authority" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "bets" ADD COLUMN "marketid" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "markets" ADD COLUMN "marketid" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "bets" ADD CONSTRAINT "bets_marketid_markets_marketid_fk" FOREIGN KEY ("marketid") REFERENCES "public"."markets"("marketid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bets" DROP COLUMN "market";--> statement-breakpoint
ALTER TABLE "markets" DROP COLUMN "yesPool";--> statement-breakpoint
ALTER TABLE "markets" DROP COLUMN "noPool";--> statement-breakpoint
ALTER TABLE "markets" DROP COLUMN "yesUsers";--> statement-breakpoint
ALTER TABLE "markets" DROP COLUMN "noUsers";--> statement-breakpoint
ALTER TABLE "markets" DROP COLUMN "bet";--> statement-breakpoint
ALTER TABLE "markets" ADD CONSTRAINT "markets_marketid_unique" UNIQUE("marketid");