import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

// Unknown routes ko clear recovery path milta hai.
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <div>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
          <Plane size={28} />
        </span>
        <p className="mt-6 text-sm font-extrabold uppercase tracking-widest text-indigo-600">404 · Off course</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Page not found</h1>
        <p className="mt-3 text-slate-500">This page isn't part of your current journey.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}