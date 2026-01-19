import {
    pgTable,
    text,
    timestamp,
    uuid,
    integer,
    jsonb
} from "drizzle-orm/pg-core"

export const cases = pgTable("cases", {
    id: uuid("id").defaultRandom().primaryKey(),

    // Organization & User
    orgId: text("org_id").notNull(),
    userId: text("user_id").notNull(), // Clerk user ID

    // Case Metadata
    caseTitle: text("case_title").notNull(),

    // File Information
    fileName: text("file_name").notNull(),
    fileSize: integer("file_size").notNull(),
    fileUrl: text("file_url").notNull(), // Vercel Blob URL

    // Analysis Status
    status: text("status").notNull(), // 'pending' | 'analyzed' | 'error'

    // AI Recommendations
    aiRecommendations: jsonb("ai_recommendations"),
    errorMessage: text("error_message"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    analyzedAt: timestamp("analyzed_at")
})
