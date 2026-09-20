import { ToolBar, Canvas } from "@/components/ui";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { markdownApi } from "@/api/client";

export const CanvasPage = () => {
  const [content, setContent] = useState("");
  const [isAssisting, setIsAssisting] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.importedContent) return;

    setContent(location.state.importedContent);
    setFileName(location.state.fileName ?? null);
    setHasEdited(false);

    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate]);

  useEffect(() => {
    if (!hasEdited) return;

    const timeout = setTimeout(async () => {
      try {
        const file = new File([content], fileName || "untitled.md", {
          type: "text/markdown",
        });

        if (!fileName) {
          const rawRes = await markdownApi.apiMarkdownUploadPostRaw({ file });
          const textData = await rawRes.raw.text();

          let newName = "";
          try {
            const json = JSON.parse(textData);
            newName = json.fileName || json.FileName;
          } catch {
            newName = textData;
          }

          if (newName) {
            setFileName(newName);
          }
        } else {
          await markdownApi.apiMarkdownFileNamePutRaw({
            fileName,
            file,
          });
        }

        setSaved(true);
        setHasEdited(false);
      } catch (error) {
        console.error("Save failed:", error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [content, fileName, hasEdited]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const format = (before: string, after = "") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = content.slice(start, end);

    const nextContent =
      content.slice(0, start) +
      before +
      selected +
      after +
      content.slice(end);

    setContent(nextContent);
    setSaved(false);
    setHasEdited(true);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursorStart = start + before.length;
      const cursorEnd = cursorStart + selected.length;

      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const assist = async () => {
    if (!content.trim() || isAssisting) return;
    setIsAssisting(true);

    try {
      const response = await markdownApi.apiMarkdownBeautifyPostRaw({
        body: content,
      });

      const beautifiedMarkdown = await response.raw.text();

      if (beautifiedMarkdown) {
        setContent(beautifiedMarkdown);
        setSaved(false);
        setHasEdited(true);
      }
    } catch (error) {
      console.error("Failed to beautify markdown:", error);
    } finally {
      setIsAssisting(false);
    }
  };
  return (
    <div className="absolute inset-0 pl-48 bg-zinc-50 flex flex-col">
      <main className="flex-1 w-full h-full pt-8 px-8 pb-8 flex">
        <Canvas
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSaved(false);
            setHasEdited(true);
          }}
          onFormat={format}
          onAssist={assist}
          isAssisting={isAssisting}
          fileName={fileName}
          saved={saved}
          textareaRef={textareaRef}
        />
      </main>
    </div>
  );
};