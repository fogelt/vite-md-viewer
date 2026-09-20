import { useEffect, useState } from "react";
import { Download, FolderInput, Loader2, PlusCircle } from "lucide-react";
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
      await markdownApi.apiMarkdownFileNameDelete({ fileName });
    } catch (err: any) {
      console.error("Failed to delete file:", err);
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const response = await markdownApi.apiMarkdownFileNameGetRaw({ fileName });
      const content = await response.raw.text();

      const blob = new Blob([content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download file:", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    try {
      const rawRes = await markdownApi.apiMarkdownUploadPostRaw({ file: uploadedFile });
      const textData = await rawRes.raw.text();

      let newFileName = uploadedFile.name;
      try {
        const json = JSON.parse(textData);
        newFileName = json.fileName || json.FileName || uploadedFile.name;
      } catch {
        if (textData.trim()) newFileName = textData.trim();
      }

      setFiles((prev) => (prev.includes(newFileName) ? prev : [...prev, newFileName]));

      const content = await uploadedFile.text();
      markdownApi.apiMarkdownFileNamePutRaw({ fileName: uploadedFile.name })
      navigate("/", { state: { importedContent: content, fileName: newFileName } });
    } catch (err) {
      console.error("Failed to upload file:", err);
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  return (
    <div className="absolute inset-0 pl-64 bg-zinc-50 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Server Files</h1>

          <div className="bg-white shadow-sm border border-zinc-200 rounded-lg p-1 flex items-center gap-1 text-zinc-600">
            <label className="cursor-pointer flex items-center gap-1.5 p-2 hover:bg-zinc-200/60 rounded-md transition-colors text-zinc-700" title="Import File">
              <PlusCircle className="w-5 h-5" />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

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
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};