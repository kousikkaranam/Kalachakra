CREATE TYPE "public"."data_layer" AS ENUM('MYTHIC', 'MODERN');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('LOKA', 'YUGA', 'MANVANTARA', 'KALPA', 'BEING', 'TEXT', 'EVENT');--> statement-breakpoint
CREATE TABLE "entities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "entity_type" NOT NULL,
	"slug" text NOT NULL,
	"name_iast" text NOT NULL,
	"name_devanagari" text,
	"summary" text,
	"name_embedding" text,
	"summary_embedding" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "entity_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_id" uuid NOT NULL,
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"layer" "data_layer" DEFAULT 'MYTHIC' NOT NULL,
	"text_id" uuid,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entity_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_entity_id" uuid NOT NULL,
	"target_entity_id" uuid NOT NULL,
	"relationship_type" text NOT NULL,
	"semantic_similarity" real,
	"confidence" real DEFAULT 0.5,
	"text_id" uuid,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sanskrit_texts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_id" uuid,
	"source_id" uuid,
	"location_path" text NOT NULL,
	"text_sanskrit" text,
	"text_translation" text,
	"transliteration" text,
	"sanskrit_embedding" text,
	"translation_embedding" text,
	"semantic_embedding" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"author_translator" text,
	"edition_year" text,
	"license" text DEFAULT 'Public Domain',
	"url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sources_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "entity_details" ADD CONSTRAINT "entity_details_entity_id_entities_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_details" ADD CONSTRAINT "entity_details_text_id_sanskrit_texts_id_fk" FOREIGN KEY ("text_id") REFERENCES "public"."sanskrit_texts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relationships" ADD CONSTRAINT "entity_relationships_source_entity_id_entities_id_fk" FOREIGN KEY ("source_entity_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relationships" ADD CONSTRAINT "entity_relationships_target_entity_id_entities_id_fk" FOREIGN KEY ("target_entity_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_relationships" ADD CONSTRAINT "entity_relationships_text_id_sanskrit_texts_id_fk" FOREIGN KEY ("text_id") REFERENCES "public"."sanskrit_texts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sanskrit_texts" ADD CONSTRAINT "sanskrit_texts_entity_id_entities_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sanskrit_texts" ADD CONSTRAINT "sanskrit_texts_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_entities_type" ON "entities" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_entities_slug" ON "entities" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_entity_details_entity_layer" ON "entity_details" USING btree ("entity_id","layer");--> statement-breakpoint
CREATE INDEX "idx_relationships_source" ON "entity_relationships" USING btree ("source_entity_id");--> statement-breakpoint
CREATE INDEX "idx_relationships_target" ON "entity_relationships" USING btree ("target_entity_id");--> statement-breakpoint
CREATE INDEX "idx_sanskrit_texts_entity" ON "sanskrit_texts" USING btree ("entity_id");