export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl self-center">
        Which album cover is better?
      </h2>
      <div className="h-4" />
      <div className="p-6 border rounded-md bg-card text-card-foreground h-96 w-[700px] flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-between w-full space-x-4">
          <div className="w-1/2 h-[200px] bg-white">option 1</div>
          <div>vs.</div>
          <div className="w-1/2 h-[200px] bg-white">option 2</div>
        </div>
      </div>
    </div>
  );
}
