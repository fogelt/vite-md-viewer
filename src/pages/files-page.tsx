import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { markdownApi } from "@/api/client";
import { FileItem } from "@/components/ui";
import { useNavigate } from "react-router";

export const FilesPage = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleImport = async (fileName: string) => {
    try {
      const response = await markdownApi.apiMarkdownFileNameGetRaw({ fileName });
      const content = await response.raw.text();

      navigate("/", { state: { importedContent: content, fileName } });
    } catch (err: any) {
      console.error("Failed to import file:", err);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      setFiles((prev) => prev.filter((f) => f !== fileName));
      markdownApi.apiMarkdownFileNameDelete({ fileName })
    } catch (err: any) {
      console.error("Failed to delete file:", err);
    }
  };

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
            <FileItem
              key={file}
              fileName={file}
              onImport={handleImport}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};