import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  displayPictureUrl: text(),
});


export const Posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: integer('user_id').references(() => Users.id).notNull(),
  displayPictureUrl: text(),
  contentType: varchar({ enum: ["linkedin", "twitter", "instagram"] })
})