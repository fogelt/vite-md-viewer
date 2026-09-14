import { ChangeEvent, RefObject } from "react";
import { Check } from "lucide-react";

interface CanvasProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fileName: string | null;
  saved: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export const Canvas = ({
  value,
  onChange,
  fileName,
  saved,
  textareaRef,
}: CanvasProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute -top-6 left-1 flex items-center gap-1.5 text-xs text-zinc-400">
        {saved && <Check className="w-3 h-3 text-blue-400" />}

        <span className="max-w-64 truncate">
          {fileName ?? "Untitled"}
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className="bg-white border-zinc-200 rounded-lg w-full h-full resize-none border shadow-sm outline-none font-mono text-base leading-relaxed p-4"
      />
    </div>
  );
};