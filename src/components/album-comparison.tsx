"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Album } from "@/lib/types";
import { updateVotes } from "@/db/queries/album/upsert";
import { getRandomMetalAlbums } from "@/lib/spotify/getMetalAlbums";

interface AlbumComparisonProps {
  initialAlbums?: Album[];
}

export const AlbumComparison: React.FC<AlbumComparisonProps> = ({
  initialAlbums,
}) => {
  const [albums, setAlbums] = useState(initialAlbums || []);

  useEffect(() => {
    console.log("current albums:", albums);
  }, [albums]);

  const handleVote = (album: Album) => {
    // Handle voting logic here, e.g., update votes in the database
    updateVotes(album);
    fetchNewAlbums(); // Trigger new albums to be fetched
  };

  const fetchNewAlbums = async () => {
    // Logic to fetch new albums after a vote
    const newAlbums = await getRandomMetalAlbums();
    setAlbums(newAlbums);
  };

  // Ensure we have exactly 2 albums for comparison
  if (albums.length < 2) {
    return (
      <div className="p-6 border rounded-md bg-card text-card-foreground h-96 w-[700px] flex flex-col items-center justify-center">
        <p className="text-muted-foreground">
          Need at least 2 albums to compare
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-md bg-card text-card-foreground h-96 w-[700px] flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between w-full space-x-4">
        {albums.slice(0, 2).map((album, index) => (
          <React.Fragment key={album.id}>
            <div className="w-1/2 h-[300px] flex flex-col items-center justify-center">
              <Image
                src={album.imageUrl}
                alt={album.name}
                width={200}
                height={200}
                className="rounded-xl shadow"
              />

              <div className="h-2" />

              <h3 className="text-lg font-semibold text-foreground">
                {album.name}
              </h3>

              <div className="h-2" />
              <Button onClick={() => handleVote(album)}>Better</Button>
            </div>
            {index === 0 && <div>vs.</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
