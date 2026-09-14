import { ChangeEvent, RefObject, useState } from "react";
import { Check, Columns2, Pencil } from "lucide-react";
import { MarkdownView } from "@/components/ui";

interface CanvasProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fileName: string | null;
  saved: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

const surface =
  "bg-white border border-zinc-200 rounded-lg shadow-sm";

export const Canvas = ({
  value,
  onChange,
  fileName,
  saved,
  textareaRef,
}: CanvasProps) => {
  const [split, setSplit] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div className="absolute -top-6 left-1 flex items-center gap-1.5 text-xs text-zinc-400">
        {saved && <Check className="h-3 w-3 text-blue-400" />}

        <span
          className="max-w-64 truncate"
          title={fileName ?? "Untitled"}
        >
          {fileName ?? "Untitled"}
        </span>
      </div>

      <div className="absolute -top-7 right-1 flex gap-0.5 rounded-md bg-zinc-100 p-0.5">
        <button
          type="button"
          onClick={() => setSplit(false)}
          className={`rounded p-1 transition-colors ${!split
            ? "bg-white text-zinc-700 shadow-sm"
            : "text-zinc-400 hover:text-zinc-600"
            } `}
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
            } `}
          title="Split view"
        >
          <Columns2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex h-full w-full gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={`${surface} h-full resize-none p-4 font-mono text-base leading-relaxed outline-none ${split ? "w-1/2" : "w-full"
            } `}
        />

        {split && (
          <MarkdownView
            content={value}
            className={`${surface} h-full w-1/2 overflow-auto p-4`}
          />
        )}
      </div>
    </div>
  );
};