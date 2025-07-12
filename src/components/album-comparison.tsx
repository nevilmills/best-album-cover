"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Album } from "@/lib/types";

interface AlbumComparisonProps {
  initialAlbums: Album[];
}

export const AlbumComparison: React.FC<AlbumComparisonProps> = ({
  initialAlbums,
}) => {
  const [albums, setAlbums] = useState(initialAlbums);

  console.log("Initial albums:", initialAlbums[0].imageUrl);

  return (
    <div className="p-6 border rounded-md bg-card text-card-foreground h-96 w-[700px] flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between w-full space-x-4">
        {albums.map((album, index) => (
          <React.Fragment key={album.id}>
            <div className="w-1/2 h-[300px] text-black flex flex-col items-center justify-center">
              <Image
                src={album.imageUrl}
                alt={album.name}
                width={200}
                height={200}
                className="rounded-xl shadow"
              />

              <div className="h-2" />

              <h3 className="text-lg font-semibold text-white">{album.name}</h3>

              <div className="h-2" />
              <Button>Better</Button>
            </div>
            {index === 0 && <div>vs.</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
