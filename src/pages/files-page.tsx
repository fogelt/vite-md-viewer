import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { markdownApi } from "@/api/client";

export const FilesPage = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFiles() {
      try {
        const response = await markdownApi.apiMarkdownAllFilesGetRaw();
        const data = await response.raw.json();
        setFiles(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch files");
      } finally {
        setLoading(false);
      }
    }

    loadFiles();
  }, []);

  return (
    <div className="absolute inset-0 pl-64 bg-zinc-50 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-6">Server Files</h1>

        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading files...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error} (Make sure your backend is running)
          </div>
        )}

        {!loading && !error && files.length === 0 && (
          <p className="text-zinc-500 text-sm">No markdown files found on the server.</p>
        )}

        <div className="grid grid-cols-1 gap-3">
          {files.map((file) => (
            <div
              key={file}
              className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-lg shadow-sm hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-800">{file}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};