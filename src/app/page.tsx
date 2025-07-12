import { AlbumComparison } from "@/components/album-comparison";
import { getRandomMetalAlbums } from "@/lib/spotify/getMetalAlbums";

export default async function Home() {
  const data = await getRandomMetalAlbums();

  console.log("Fetched albums:", data);

  if (!data || data.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl self-center">
        Which album cover is better?
      </h2>
      <div className="h-4" />
      <AlbumComparison initialAlbums={data} />
    </div>
  );
}
