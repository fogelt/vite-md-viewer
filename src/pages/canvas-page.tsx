import { ToolBar, Canvas } from "@/components/ui";

export const CanvasPage = () => {
  return (
    <div className="absolute inset-0 pl-48 bg-zinc-50 flex flex-col">
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-2">
        <ToolBar />
      </header>

      <main className="flex-1 w-full h-full pt-20 px-8 pb-8 flex">
        <Canvas />
      </main>
    </div>
  );
};