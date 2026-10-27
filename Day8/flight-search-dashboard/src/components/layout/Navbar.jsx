import { Link } from "react-router-dom";
import { Plane, Bookmark, History } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

// Shared navigation: brand, page sections aur theme switch.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <Plane size={21} />
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              SkyScout
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Find your next journey
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#search"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300"
          >
            Search flights
          </a>
          <a
            href="#history"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300"
          >
            <History size={16} /> Search history
          </a>
          <a
            href="#saved"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300"
          >
            <Bookmark size={16} /> Saved flights
          </a>
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}