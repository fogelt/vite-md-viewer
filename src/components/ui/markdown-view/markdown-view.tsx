import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export const MarkdownView = ({
  content,
  className,
}: MarkdownViewProps) => {
  return (
    <div className={className}>
      <article className="prose prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};