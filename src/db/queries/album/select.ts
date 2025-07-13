"use server";

import { db } from "@/db";
import { albumTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const selectAlbumsByVotes = async (page: number) => {
  const offset = (page - 1) * 10; // Assuming 10 items per page

  const data = await db
    .select()
    .from(albumTable)
    .orderBy(desc(albumTable.votes))
    .limit(10)
    .offset(offset);

  return data;
};
