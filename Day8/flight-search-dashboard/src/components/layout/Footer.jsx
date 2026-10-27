import { Plane } from "lucide-react";

// Simple footer with project branding and API attribution.
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-slate-400">
        <p className="flex items-center gap-2">
          <Plane size={16} /> SkyScout Flight Search
        </p>
        <p>Flight data availability depends on the connected search provider.</p>
      </div>
    </footer>
  );
}