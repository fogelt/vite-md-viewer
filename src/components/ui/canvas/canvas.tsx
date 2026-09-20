import { ChangeEvent, RefObject, useState } from "react";
import { Check, Columns2, Pencil } from "lucide-react";
import { MarkdownView, ToolBar } from "@/components/ui";

interface CanvasProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fileName: string | null;
  saved: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onFormat: (before: string, after?: string) => void;
  onAssist: () => void;
  isAssisting: boolean;
}

const surface = "bg-white border border-zinc-200 rounded-lg shadow-sm";

export const Canvas = ({
  value,
  onChange,
  fileName,
  saved,
  textareaRef,
  onFormat,
  onAssist,
  isAssisting
}: CanvasProps) => {
  const [split, setSplit] = useState(false);

  return (
    <div className="relative h-full w-full flex flex-col">
      <header className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <ToolBar onFormat={onFormat} onAssist={onAssist} isAssisting={isAssisting} />
      </header>
      <div className="flex h-full w-full gap-2 flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={`${surface} h-[92%] resize-none p-4 mt-12 font-mono text-base leading-relaxed outline-none ${split ? "w-1/2" : "w-full"
            }`}
        />

        {split && (
          <MarkdownView
            content={value}
            className={`${surface} h-[92%] w-1/2 mt-12 overflow-auto p-4`}
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          {saved && <Check className="h-3 w-3 text-blue-400" />}
          <span className="max-w-64 truncate" title={fileName ?? "Untitled file"}>
            {fileName ?? "Untitled file"}
          </span>
        </div>

        <div className="flex gap-0.5 rounded-md bg-zinc-100 p-0.5">
          <button
            type="button"
            onClick={() => setSplit(false)}
            className={`rounded p-1 transition-colors ${!split
              ? "bg-white text-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-zinc-600"
              }`}
            title="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setSplit(true)}
            className={`rounded p-1 transition-colors ${split
              ? "bg-white text-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-zinc-600"
              }`}
            title="Split view"
          >
            <Columns2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};