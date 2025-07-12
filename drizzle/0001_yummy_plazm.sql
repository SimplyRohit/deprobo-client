CREATE TABLE "bets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"authority" varchar(44) NOT NULL,
	"market" varchar(44) NOT NULL,
	"amount" integer NOT NULL,
	"outcome" integer NOT NULL,
	"claimed" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "markets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "markets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"closeTime" integer NOT NULL,
	"createdAt" integer NOT NULL,
	"resolved" integer DEFAULT 0 NOT NULL,
	"winningOutcome" integer DEFAULT 0 NOT NULL,
	"yesPool" varchar(44) NOT NULL,
	"noPool" varchar(44) NOT NULL,
	"totalYes" integer DEFAULT 0 NOT NULL,
	"totalNo" integer DEFAULT 0 NOT NULL,
	"yesUsers" integer DEFAULT 0 NOT NULL,
	"noUsers" integer DEFAULT 0 NOT NULL,
	"authority" varchar(44) NOT NULL,
	"bet" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;