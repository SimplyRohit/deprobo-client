CREATE TABLE "bets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"authority" varchar(50) NOT NULL,
	"marketid" varchar(50) NOT NULL,
	"amount" integer NOT NULL,
	"outcome" boolean NOT NULL,
	"claimed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "markets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "markets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"marketid" varchar(50) NOT NULL,
	"question" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"closeTime" integer NOT NULL,
	"createdAt" integer NOT NULL,
	"authority" varchar(44) NOT NULL,
	"resolved" boolean DEFAULT false NOT NULL,
	"winningOutcome" boolean DEFAULT false NOT NULL,
	"totalYes" integer DEFAULT 0 NOT NULL,
	"totalNo" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "markets_marketid_unique" UNIQUE("marketid")
);
--> statement-breakpoint
ALTER TABLE "bets" ADD CONSTRAINT "bets_marketid_markets_marketid_fk" FOREIGN KEY ("marketid") REFERENCES "public"."markets"("marketid") ON DELETE no action ON UPDATE no action;