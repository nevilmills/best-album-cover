import { Leaderboard } from "@/components/leaderboard";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { selectAlbumsByVotes } from "@/db/queries/album/select";
import React from "react";

interface LeaderboardItem {
  id: string;
  rank: number;
  albumName: string;
  artist: string;
  imageUrl: string;
  votes: number;
}

// Mock data for demonstration
const mockLeaderboardData: LeaderboardItem[] = [
  {
    id: "1",
    rank: 1,
    albumName: "Master of Puppets",
    artist: "Metallica",
    imageUrl: "/placeholder-album.jpg",
    votes: 1250,
  },
  {
    id: "2",
    rank: 2,
    albumName: "The Number of the Beast",
    artist: "Iron Maiden",
    imageUrl: "/placeholder-album.jpg",
    votes: 1180,
  },
  {
    id: "3",
    rank: 3,
    albumName: "Paranoid",
    artist: "Black Sabbath",
    imageUrl: "/placeholder-album.jpg",
    votes: 1050,
  },
  {
    id: "4",
    rank: 4,
    albumName: "Reign in Blood",
    artist: "Slayer",
    imageUrl: "/placeholder-album.jpg",
    votes: 980,
  },
  {
    id: "5",
    rank: 5,
    albumName: "Back in Black",
    artist: "AC/DC",
    imageUrl: "/placeholder-album.jpg",
    votes: 920,
  },
];

interface PageProps {}

export const Page: React.FC<PageProps> = async ({}) => {
  const albums = await selectAlbumsByVotes(1);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            The best metal album covers ranked by community votes
          </p>
        </div>

        {/* Leaderboard Container */}
        <Leaderboard initialAlbums={albums.slice(0, 10)} />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Rankings updated in real-time based on community voting
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
