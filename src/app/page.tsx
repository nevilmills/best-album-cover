import { AlbumComparison } from "@/components/album-comparison";
import { getRandomMetalAlbums } from "@/lib/spotify/getMetalAlbums";

export default async function Home() {
  const data = await getRandomMetalAlbums();

  console.log("Fetched albums:", data);

  if (!data || data.length === 0) {
    return <div>loading...</div>;
  }

  if (data.length < 2) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl self-center">
          Not enough albums to compare
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl self-center">
        Which album cover is better?
      </h2>
      <div className="h-4" />
      <AlbumComparison initialAlbums={data} />
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
        <div className="flex flex-row items-center space-x-2 ">
          <a
            href="https://github.com/nevilmills/best-album-cover"
            className="text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="" className="text-muted-foreground hover:text-foreground">
            Results
          </a>
        </div>
      </div>
    </div>
  );
}
