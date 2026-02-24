"use client";

import Link from "next/link";

function PlanoLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Fuselage — thick body pointing up */}
      <path d="M13 24 L13 8 Q13 4 16 2 Q19 4 19 8 L19 24 Z" fill="#111827" />
      {/* Left wing — detached from body */}
      <path d="M3 19 L11 13 L11 18 L5 20.5 Z" fill="#111827" />
      {/* Right wing — attached to body */}
      <path d="M19 13 L29 19 L27 20.5 L19 18 Z" fill="#111827" />
      {/* Tail left */}
      <path d="M10 26 L13 22 L13 26 Z" fill="#111827" />
      {/* Tail right */}
      <path d="M22 26 L19 22 L19 26 Z" fill="#111827" />
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
