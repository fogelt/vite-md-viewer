import { ToolBar, Canvas } from "@/components/ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const CanvasPage = () => {
  const [content, setContent] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.importedContent) {
      const { importedContent } = location.state;
      setContent(importedContent);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="absolute inset-0 pl-48 bg-zinc-50 flex flex-col">
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-2">
        <ToolBar />
      </header>

      <main className="flex-1 w-full h-full pt-20 px-8 pb-8 flex">
        <Canvas
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </main>
    </div>
  );
};