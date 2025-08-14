// src/db/schema/index.ts
import { relations } from 'drizzle-orm';
import {
  entities,
  sources,
  sanskritTexts,
  entityDetails,
  entityRelationships,
  entityTypeEnum,
  dataLayerEnum,
  entitiesRelations,
} from './entities';

// Additional relations for other tables
export const sourcesRelations = relations(sources, ({ many }) => ({
  sanskritTexts: many(sanskritTexts),
}));

export const sanskritTextsRelations = relations(sanskritTexts, ({ one, many }) => ({
  entity: one(entities, {
    fields: [sanskritTexts.entityId],
    references: [entities.id],
  }),
  source: one(sources, {
    fields: [sanskritTexts.sourceId],
    references: [sources.id],
  }),
  details: many(entityDetails),
  relationships: many(entityRelationships),
}));

export const entityDetailsRelations = relations(entityDetails, ({ one }) => ({
  entity: one(entities, {
    fields: [entityDetails.entityId],
    references: [entities.id],
  }),
  text: one(sanskritTexts, {
    fields: [entityDetails.textId],
    references: [sanskritTexts.id],
  }),
}));

export const entityRelationshipsRelations = relations(entityRelationships, ({ one }) => ({
  sourceEntity: one(entities, {
    fields: [entityRelationships.sourceEntityId],
    references: [entities.id],
    relationName: 'sourceEntity',
  }),
  targetEntity: one(entities, {
    fields: [entityRelationships.targetEntityId],
    references: [entities.id],
    relationName: 'targetEntity',
  }),
  text: one(sanskritTexts, {
    fields: [entityRelationships.textId],
    references: [sanskritTexts.id],
  }),
}));

// Export all tables, enums, and relations
export {
  // Tables
  entities,
  sources,
  sanskritTexts,
  entityDetails,
  entityRelationships,
  
  // Enums
  entityTypeEnum,
  dataLayerEnum,
  
  // Relations
  entitiesRelations,
};

// Export types for TypeScript
export type Entity = typeof entities.$inferSelect;
export type NewEntity = typeof entities.$inferInsert;
export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;
export type SanskritText = typeof sanskritTexts.$inferSelect;
export type NewSanskritText = typeof sanskritTexts.$inferInsert;
export type EntityDetail = typeof entityDetails.$inferSelect;
export type NewEntityDetail = typeof entityDetails.$inferInsert;
export type EntityRelationship = typeof entityRelationships.$inferSelect;
export type NewEntityRelationship = typeof entityRelationships.$inferInsert;
