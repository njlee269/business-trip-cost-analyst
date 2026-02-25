"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-btn group-hover:shadow-btn-hover transition-all duration-300 group-hover:-translate-y-0.5 overflow-hidden">
            <Image
              src={`${process.env.__NEXT_ROUTER_BASEPATH || ""}/logo2.png`}
              alt="PLANO"
              width={22}
              height={22}
              className="object-contain"
            />
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
            className="glass-button text-xs sm:text-sm !px-3 sm:!px-5 !py-1.5 sm:!py-2"
          >
            Plan a Trip
          </Link>
        </nav>
      </div>
    </header>
  );
}
