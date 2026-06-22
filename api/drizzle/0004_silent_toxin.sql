DROP INDEX "channel_youtubeId_unique";--> statement-breakpoint
DROP INDEX "favorite_title_unique";--> statement-breakpoint
DROP INDEX "favorite_url_unique";--> statement-breakpoint
DROP INDEX "todo_title_unique";--> statement-breakpoint
DROP INDEX "account_userId_idx";--> statement-breakpoint
DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "session_userId_idx";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "user_username_unique";--> statement-breakpoint
DROP INDEX "verification_identifier_idx";--> statement-breakpoint
ALTER TABLE `todo` ALTER COLUMN "done" TO "done" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `channel_youtubeId_unique` ON `channel` (`youtubeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_title_unique` ON `favorite` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_url_unique` ON `favorite` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `todo_title_unique` ON `todo` (`title`);--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);