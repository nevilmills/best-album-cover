"use client";
import { ExistingAlbum } from "@/db/schema";
import React, { useState } from "react";
import { LeaderboardRow } from "./leaderboard-row";
import { Button } from "./ui/button";
import { selectAlbumsByVotes } from "@/db/queries/album/select";

interface LeaderboardProps {
  initialAlbums: ExistingAlbum[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ initialAlbums }) => {
  const [albums, setAlbums] = useState<ExistingAlbum[]>(initialAlbums);
  const [page, setPage] = useState(1);

  const onNextPage = async () => {
    // Logic to fetch the next page of albums
    const data = await selectAlbumsByVotes(page + 1); // Example: Fetch next page
    setPage(page + 1);
    setAlbums(data.slice(0, 10));
  };

  const onPreviousPage = async () => {
    if (page <= 1) return; // Prevent going to a page less than 1
    const data = await selectAlbumsByVotes(page - 1); // Example: Fetch previous page
    setPage(page - 1);
    setAlbums(data.slice(0, 10));
  };

  return (
    <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted/50 px-6 py-4 border-b">
        <div className="grid grid-cols-12 gap-4 items-center font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          <div className="col-span-1">Rank</div>
          <div className="col-span-2">Cover</div>
          <div className="col-span-6">Album</div>
          <div className="col-span-3 text-right">Votes</div>
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="divide-y">
        {albums.map((item, index) => (
          <LeaderboardRow
            album={item}
            index={(page - 1) * 10 + index + 1}
            key={item.id}
          />
        ))}
      </div>
      <div className="px-6 py-4 border-t bg-muted/20">
        <div className="flex items-center justify-center">
          <div className="flex flex-row items-center space-x-2">
            {page === 1 ? (
              <Button variant="outline" size="sm" onClick={onNextPage}>
                Next Page
              </Button>
            ) : page > 1 && albums.length === 11 ? (
              <>
                <Button variant="outline" size="sm" onClick={onPreviousPage}>
                  Previous Page
                </Button>
                <Button variant="outline" size="sm" onClick={onNextPage}>
                  Next Page
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={onPreviousPage}>
                Previous Page
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
