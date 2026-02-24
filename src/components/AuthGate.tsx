"use client";

import { useState, useEffect } from "react";

const ACCESS_CODE = "9999";
const STORAGE_KEY = "plano_auth";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === ACCESS_CODE) {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, ACCESS_CODE);
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="opacity-80">
              <path d="M13 24 L13 8 Q13 4 16 2 Q19 4 19 8 L19 24 Z" fill="#111827" />
              <path d="M3 19 L11 13 L11 18 L5 20.5 Z" fill="#111827" />
              <path d="M19 13 L29 19 L27 20.5 L19 18 Z" fill="#111827" />
              <path d="M10 26 L13 22 L13 26 Z" fill="#111827" />
              <path d="M22 26 L19 22 L19 26 Z" fill="#111827" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">PLANO</h1>
          <p className="text-xs text-gray-400 mt-1">Enter access code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Access code"
            autoFocus
            className={`glass-input text-center text-sm tracking-widest ${
              error ? "!border-red-300 !shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""
            }`}
          />
          {error && (
            <p className="text-xs text-red-400 animate-fade-in">
              Incorrect code. Try again.
            </p>
          )}
          <button
            type="submit"
            className="glass-button-primary w-full !py-3 text-sm"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
