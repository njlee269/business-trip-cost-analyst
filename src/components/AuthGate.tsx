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
    return (
      <>
        {children}
        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setAuthenticated(false);
          }}
          className="fixed bottom-4 right-4 text-[10px] text-gray-300 hover:text-gray-500 transition-colors z-50"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={`${process.env.__NEXT_ROUTER_BASEPATH || ""}/logo2.png`} alt="PLANO" width={40} height={40} className="opacity-90" />
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
