import React from "react";
import { FileText, Trash2, Edit, Download } from "lucide-react";

interface FileItemProps {
  fileName: string;
  onImport: (fileName: string) => void;
  onDelete: (fileName: string) => void;
  onDownload: (fileName: string) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ fileName, onImport, onDelete, onDownload }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-lg shadow-sm hover:border-zinc-300 transition-colors group">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
        <span className="text-sm font-medium text-zinc-800">{fileName}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onImport(fileName)}
          className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors"
          title="Edit File"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDownload(fileName)}
          className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors"
          title="Download File"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(fileName)}
          className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors"
          title="Delete File"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};