CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"task" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
