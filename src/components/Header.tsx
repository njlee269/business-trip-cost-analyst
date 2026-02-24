"use client";

import Link from "next/link";

function PlanoLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Fuselage — pointing straight up */}
      <rect x="14.5" y="4" width="3" height="20" rx="1.5" fill="#111827" />
      {/* Nose cone */}
      <path d="M14.5 6 L16 2 L17.5 6" fill="#111827" />
      {/* Tail fin */}
      <path d="M14 24 L16 22 L18 24 L16 26 Z" fill="#111827" />
      {/* Left wing — detached, gap from fuselage */}
      <path d="M4 17 L12 14 L12 18 L6 19 Z" fill="#111827" />
      {/* Right wing — detached, gap from fuselage */}
      <path d="M28 17 L20 14 L20 18 L26 19 Z" fill="#111827" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-btn group-hover:shadow-btn-hover transition-all duration-300 group-hover:-translate-y-0.5">
            <PlanoLogo size={22} />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              PLANO
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
