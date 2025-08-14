// src/db/schema/entities.ts
import { pgTable, uuid, text, timestamp, pgEnum, jsonb, real, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const entityTypeEnum = pgEnum('entity_type', [
  'LOKA', 'YUGA', 'MANVANTARA', 'KALPA', 'BEING', 'TEXT', 'EVENT'
]);

export const dataLayerEnum = pgEnum('data_layer', ['MYTHIC', 'MODERN']);

// Main entities table
export const entities = pgTable('entities', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: entityTypeEnum('type').notNull(),
  slug: text('slug').unique().notNull(),
  nameIast: text('name_iast').notNull(),
  nameDevanagari: text('name_devanagari'),
  summary: text('summary'),
  nameEmbedding: text('name_embedding'), // vector as text for now
  summaryEmbedding: text('summary_embedding'), // vector as text for now
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  typeIdx: index('idx_entities_type').on(table.type),
  slugIdx: index('idx_entities_slug').on(table.slug),
}));

// Sources table
export const sources = pgTable('sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  authorTranslator: text('author_translator'),
  editionYear: text('edition_year'),
  license: text('license').default('Public Domain'),
  url: text('url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Sanskrit texts with vector embeddings
export const sanskritTexts = pgTable('sanskrit_texts', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityId: uuid('entity_id').references(() => entities.id, { onDelete: 'cascade' }),
  sourceId: uuid('source_id').references(() => sources.id),
  locationPath: text('location_path').notNull(),
  textSanskrit: text('text_sanskrit'),
  textTranslation: text('text_translation'),
  transliteration: text('transliteration'),
  sanskritEmbedding: text('sanskrit_embedding'),
  translationEmbedding: text('translation_embedding'),
  semanticEmbedding: text('semantic_embedding'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  entityIdx: index('idx_sanskrit_texts_entity').on(table.entityId),
}));

// Entity details (key-value with layer support)
export const entityDetails = pgTable('entity_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityId: uuid('entity_id').references(() => entities.id, { onDelete: 'cascade' }).notNull(),
  key: text('key').notNull(),
  value: jsonb('value').notNull(),
  layer: dataLayerEnum('layer').default('MYTHIC').notNull(),
  textId: uuid('text_id').references(() => sanskritTexts.id),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  entityLayerIdx: index('idx_entity_details_entity_layer').on(table.entityId, table.layer),
}));

// Relationships between entities
export const entityRelationships = pgTable('entity_relationships', {
  id: uuid('id').defaultRandom().primaryKey(),
  sourceEntityId: uuid('source_entity_id').references(() => entities.id, { onDelete: 'cascade' }).notNull(),
  targetEntityId: uuid('target_entity_id').references(() => entities.id, { onDelete: 'cascade' }).notNull(),
  relationshipType: text('relationship_type').notNull(),
  semanticSimilarity: real('semantic_similarity'),
  confidence: real('confidence').default(0.5),
  textId: uuid('text_id').references(() => sanskritTexts.id),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  sourceIdx: index('idx_relationships_source').on(table.sourceEntityId),
  targetIdx: index('idx_relationships_target').on(table.targetEntityId),
}));

// Relations
export const entitiesRelations = relations(entities, ({ many }) => ({
  details: many(entityDetails),
  sanskritTexts: many(sanskritTexts),
  sourceRelationships: many(entityRelationships, { relationName: 'sourceEntity' }),
  targetRelationships: many(entityRelationships, { relationName: 'targetEntity' }),
}));
