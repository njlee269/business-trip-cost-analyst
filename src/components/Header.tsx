"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-btn group-hover:shadow-btn-hover transition-all duration-300 group-hover:-translate-y-0.5">
            ?
          </div>
          <div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">
              How Much Is It?
            </span>
            <span className="hidden sm:block text-[10px] text-gray-400 -mt-0.5 tracking-wide uppercase">
              Business Trip Cost Analyst
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/planner"
            className="glass-button text-sm !px-5 !py-2"
          >
            Plan a Trip
          </Link>
        </nav>
      </div>
    </header>
  );
}
