ALTER TABLE "markets" ADD COLUMN "yesPool" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "markets" ADD COLUMN "noPool" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "markets" ADD COLUMN "yesUsers" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "markets" ADD COLUMN "noUsers" integer DEFAULT 0 NOT NULL;