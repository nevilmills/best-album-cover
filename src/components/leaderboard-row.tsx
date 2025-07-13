import { ExistingAlbum } from "@/db/schema";
import React from "react";

interface LeaderboardRowProps {
  index: number;
  album: ExistingAlbum;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  album,
  index,
}) => {
  return (
    <div
      key={album.id}
      className="px-6 py-4 hover:bg-muted/30 transition-colors"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Rank */}
        <div className="col-span-1">
          <div className="flex items-center">
            {index <= 3 ? (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 1
                    ? "bg-yellow-500"
                    : index === 2
                    ? "bg-gray-400"
                    : "bg-orange-600"
                }`}
              >
                {index}
              </div>
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                {index}
              </span>
            )}
          </div>
        </div>

        {/* Album Cover */}
        <div className="col-span-2">
          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
            {album.imageUrl ? (
              <img
                src={album.imageUrl}
                alt={album.name}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-xs text-muted-foreground">No Cover</span>
            )}
          </div>
        </div>

        {/* Album Info */}
        <div className="col-span-6">
          <div>
            <h3 className="font-semibold text-foreground">{album.name}</h3>
            <p className="text-sm text-muted-foreground">{album.artists[0]}</p>
          </div>
        </div>

        {/* Votes */}
        <div className="col-span-3 text-right">
          <div className="font-semibold text-lg">
            {album.votes.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">votes</div>
        </div>
      </div>
    </div>
  );
};
