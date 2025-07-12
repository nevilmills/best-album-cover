import { spotifyIds } from "../constants";
import { getAccessToken } from "./auth";

type Album = {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
};

const getTwoUnique = <T>(arr: T[]): [T, T] => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
};

export const getRandomMetalAlbums = async (): Promise<Album[]> => {
  const token = await getAccessToken();
  const [artistA, artistB] = getTwoUnique(spotifyIds);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchAlbums = async (artistId: string): Promise<Album | null> => {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=20`,
      { headers }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const albums = data.items;

    if (!albums.length) return null;

    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    return {
      id: randomAlbum.id,
      name: randomAlbum.name,
      artist: randomAlbum.artists[0].name,
      imageUrl: randomAlbum.images?.[0]?.url ?? "",
    };
  };

  const [albumA, albumB] = await Promise.all([
    fetchAlbums(artistA),
    fetchAlbums(artistB),
  ]);

  // Filter nulls (in case an artist has no albums or a fetch fails)
  return [albumA, albumB].filter(Boolean) as Album[];
};
