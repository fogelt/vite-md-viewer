import { ChangeEvent } from "react";

interface CanvasProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Canvas = ({ value, onChange }: CanvasProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="bg-white border-zinc-200 rounded-lg w-full h-full resize-none border shadow-sm outline-none font-mono text-base leading-relaxed p-4"
    />
  );
};