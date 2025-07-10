import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const albumsTable = pgTable("albums", {
  id: text("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  artists: text("artists").array().notNull(),
  imageUrl: text("image_url").notNull(),
  votes: integer("votes").default(0).notNull(),
});
