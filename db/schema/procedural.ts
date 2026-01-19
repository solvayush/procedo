import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer
} from "drizzle-orm/pg-core"

export const proceduralOrders = pgTable("procedural_orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  orgId: text("org_id").notNull(),

  institution: text("institution").notNull(), 
  // UNCITRAL / ICSID / LCIA

  administeringInstitution: text("administering_institution"),
  // ICSID when UNCITRAL administered by ICSID

  caseType: text("case_type"),
  // investment_arbitration, commercial, etc.

  proceduralOrderNumber: text("procedural_order_number").notNull(),
  // PO1, PO2

  rulesContext: text("rules_context").array(),
  // ["UNCITRAL 1976", "UNCITRAL Transparency Rules"]

  orderDate: timestamp("order_date"),

  sourcePdfPath: text("source_pdf_path"),

  createdAt: timestamp("created_at").defaultNow()
})

export const proceduralSections = pgTable("procedural_sections", {
  id: uuid("id").defaultRandom().primaryKey(),

  proceduralOrderId: uuid("procedural_order_id")
    .references(() => proceduralOrders.id)
    .notNull(),

  heading: text("heading").notNull(),
  // "LANGUAGE OF THE ARBITRATION"

  sectionOrder: integer("section_order"),

  pageStart: integer("page_start"),
  pageEnd: integer("page_end"),

  rawText: text("raw_text")
})

import {
  boolean,
  jsonb
} from "drizzle-orm/pg-core"

export const proceduralEvents = pgTable("procedural_events", {
  id: uuid("id").defaultRandom().primaryKey(),

  orgId: text("org_id").notNull(),

  proceduralOrderId: uuid("procedural_order_id")
    .references(() => proceduralOrders.id)
    .notNull(),

  institution: text("institution").notNull(),

  eventType: text("event_type").notNull(),
  // procedural_language, bifurcation_decision, extension_policy

  decisionValue: text("decision_value").notNull(),
  // english_only, jurisdiction_bifurcated, extensions_discouraged

  discretionary: boolean("discretionary").notNull(),

  sourceSection: text("source_section"),
  // "LANGUAGE OF THE ARBITRATION"

  sourceRuleRef: text("source_rule_ref"),
  // UNCITRAL Art 17(2), ICSID Rule 29, etc.

  confidence: integer("confidence"),
  // optional: 0–100 if you want later

  extraData: jsonb("extra_data"),
  // for rare edge cases

  createdAt: timestamp("created_at").defaultNow()
})

export const proceduralTimelines = pgTable("procedural_timelines", {
  id: uuid("id").defaultRandom().primaryKey(),

  proceduralOrderId: uuid("procedural_order_id")
    .references(() => proceduralOrders.id)
    .notNull(),

  phase: text("phase").notNull(),
  // statement_of_claim, hearing_jurisdiction

  party: text("party"),
  // claimant, respondent, both, tribunal

  days: integer("days").notNull(),

  relativeTo: text("relative_to"),

  createdAt: timestamp("created_at").defaultNow()
})
