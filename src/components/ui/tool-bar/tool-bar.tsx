import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  SquareTerminal
} from "lucide-react";

export const ToolBar = () => {
  return (
    <div className="bg-white shadow-sm border border-zinc-200 rounded-lg px-3 py-2 flex flex-row items-center gap-1 text-zinc-600">
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Bold">
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Italic">
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-zinc-200 mx-1" />
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Heading 1">
        <Heading1 className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-zinc-200 mx-1" />
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Bullet List">
        <List className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Numbered List">
        <ListOrdered className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Quote">
        <Quote className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-zinc-200 mx-1" />
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Code Block">
        <Code className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Terminal Snippet">
        <SquareTerminal className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Link">
        <Link className="w-4 h-4" />
      </button>
      <button type="button" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded transition-colors" title="Image">
        <Image className="w-4 h-4" />
      </button>
    </div>
  );
};