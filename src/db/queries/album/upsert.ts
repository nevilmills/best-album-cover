"use server";

import { db } from "@/db";
import { albumTable } from "@/db/schema";
import { Album } from "@/lib/types";
import { sql } from "drizzle-orm";

export const updateVotes = async (album: Album) => {
  const result = await db
    .insert(albumTable)
    .values({
      id: album.id,
      name: album.name,
      artists: [album.artist],
      imageUrl: album.imageUrl,
      votes: 1,
    })
    .onConflictDoUpdate({
      target: albumTable.id,
      set: {
        votes: sql`${albumTable.votes} + 1`,
      },
    })
    .returning();
  return result;
};
