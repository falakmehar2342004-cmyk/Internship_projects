
import { Sparkles } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white sm:px-6">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-pulse rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20" />

        <div className="absolute -bottom-24 -right-24 h-80 w-80 animate-pulse rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/20 [animation-delay:700ms]" />

        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl dark:bg-sky-500/10" />
      </div>

      {/* Theme toggle */}
      <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <section className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
            <Sparkles size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
          Secure access · Simple experience
        </p>
      </section>
    </main>
  );
};

export default AuthLayout;
