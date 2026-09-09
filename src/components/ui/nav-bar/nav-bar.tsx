import { NavLink } from "react-router";

export const NavBar = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col px-6 py-8 bg-white text-zinc-900 border-r border-zinc-100">
      <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-medium underline underline-offset-4 text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/files"
          className={({ isActive }) =>
            isActive ? 'font-medium underline underline-offset-4 text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
          }
        >
          Files
        </NavLink>
      </nav>
    </aside>
  );
}