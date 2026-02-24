"use client";

import { useState, useRef, useEffect } from "react";
import { Airport } from "@/lib/types";
import { searchAirports } from "@/lib/airports";

interface AirportSearchProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
}

export default function AirportSearch({
  value,
  onChange,
  placeholder,
  label,
  disabled,
}: AirportSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.length >= 1) {
      const found = searchAirports(q);
      setResults(found);
      setIsOpen(found.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    setQuery("");
    setIsOpen(false);
    setFocused(false);
  };

  const displayValue = value ? `${value.city} (${value.code})` : "";

  return (
    <div ref={wrapperRef} className="relative" style={{ zIndex: isOpen ? 100 : 1 }}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div
        className={`glass-input flex items-center gap-2 cursor-text transition-all ${
          focused ? "!border-gray-400/80 !bg-white shadow-[0_0_0_3px_rgba(156,163,175,0.15)]" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setFocused(true)}
      >
        {value && !focused ? (
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {value.code}
            </span>
            <span className="text-gray-800 font-medium text-sm">{value.city}</span>
            <span className="text-gray-400 text-xs">{value.country}</span>
            {!disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null as unknown as Airport);
                  setFocused(true);
                }}
                className="ml-auto text-gray-300 hover:text-gray-500 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              setFocused(true);
              if (query.length >= 1) setIsOpen(true);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
            autoFocus={focused && !value}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-float overflow-hidden z-50 animate-fade-in">
          {results.map((airport) => (
            <button
              key={airport.code}
              onClick={() => handleSelect(airport)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left group"
            >
              <span className="text-xs font-mono bg-gray-100 group-hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors">
                {airport.code}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">
                  {airport.city}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {airport.name} · {airport.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
