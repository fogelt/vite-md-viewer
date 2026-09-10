import { Search, SquarePen } from "lucide-react";
import { NavLink } from "react-router";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 py-2 text-sm tracking-widest uppercase transition-colors ${isActive ? "font-medium text-zinc-900" : "text-zinc-400 hover:text-zinc-900"
  }`;

export const NavBar = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-48 flex flex-col px-6 py-8 bg-white border-r border-zinc-200 shadow-sm rounded-lg z-2">
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={linkClasses}>
          <SquarePen className="w-4 h-4" />
          Canvas
        </NavLink>
        <NavLink to="/files" className={linkClasses}>
          <Search className="w-4 h-4" />
          Files
        </NavLink>
      </nav>
    </aside>
  );
};