import { FileUp, FileText, PlusCircle, FolderOpen } from "lucide-react";

interface EmptyCanvasPromptProps {
  onStartEmpty: () => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadFromServer: () => void;
}

export const EmptyCanvasPrompt = ({
  onStartEmpty,
  onImportFile,
  onLoadFromServer,
}: EmptyCanvasPromptProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-50/50 backdrop-blur-[2px] z-10">
      <div className="bg-white border border-zinc-200 rounded-xl shadow-md p-8 max-w-md w-full mx-4 text-center flex flex-col items-center">

        <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 mb-4 shadow-sm">
          <FileText className="w-6 h-6" />
        </div>

        <h2 className="text-lg font-semibold text-zinc-800 mb-1">
          Welcome to Markdown Workspace
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          How would you like to get started today?
        </p>

        <div className="flex flex-col gap-2.5 w-full">

          <button
            type="button"
            onClick={onStartEmpty}
            className="flex items-center justify-center gap-2.5 w-full px-4 py-2.5 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-zinc-500" />
            Start Empty
          </button>

          <label className="flex items-center justify-center gap-2.5 w-full px-4 py-2.5 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-colors shadow-sm cursor-pointer">
            <FileUp className="w-4 h-4 text-zinc-500" />
            Import from .md file
            <input
              type="file"
              accept=".md,.markdown,text/markdown"
              className="hidden"
              onChange={onImportFile}
            />
          </label>

          <button
            type="button"
            onClick={onLoadFromServer}
            className="flex items-center justify-center gap-2.5 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors shadow-sm"
          >
            <FolderOpen className="w-4 h-4 text-blue-100" />
            Load from Server
          </button>
        </div>

      </div>
    </div>
  );
};