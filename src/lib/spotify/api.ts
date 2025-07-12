"use server";

import { getAccessToken } from "./auth";

/**
 * Fetches a random set of metal albums from Spotify.
 * @param count
 * @returns
 */
export async function getRandomMetalAlbums(count = 2) {
  const token = await getAccessToken();

  const totalAlbums = 1000; // Spotify caps results at offset 1000
  const limit = 10; // Fetch a page of results
  const randomOffset = Math.floor(Math.random() * (totalAlbums - limit));

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=metal&type=album&limit=${limit}&offset=${randomOffset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to search for metal albums");
  }

  const data = await res.json();
  const albums = data.albums.items;

  // Randomly pick 2 unique albums from the page
  const shuffled = albums.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((album: any) => ({
    name: album.name,
    artist: album.artists[0].name,
    imageUrl: album.images[0]?.url ?? null,
    id: album.id,
  }));
}
