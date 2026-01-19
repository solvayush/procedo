import {
  pgTable,
  text,
  boolean,
  jsonb,
  unique,
  integer
} from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"

export const institutionRules = pgTable(
  "institution_rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orgId: text("org_id").notNull(),

    institution: text("institution").notNull(), // ICSID
    version: text("version").notNull(),         // 2022

    documentType: text("document_type").notNull(),
    // convention | arbitration_rules | expedited_arbitration

    ref: text("ref").notNull(),                 
    title: text("title"),
    summary: text("summary"),

    mandatory: boolean("mandatory").notNull(),

    // LEGAL CONTROL FLAGS
    nonDerogable: boolean("non_derogable").notNull().default(false),
    annulmentLinked: boolean("annulment_linked").notNull().default(false),

    // PROCEDURAL HIERARCHY
    hierarchyLevel: integer("hierarchy_level").notNull(),
    // 1 = Convention
    // 2 = Arbitration Rules
    // 3 = Expedited Arbitration

    parameterTag: text("parameter_tag"),
    aiUsage: text("ai_usage"),
    // classification_only | flagging | monitoring | benchmarking

    extraData: jsonb("extra_data")
  },
  (t) => [
    unique().on(t.orgId, t.institution, t.version, t.ref)
  ]
)


