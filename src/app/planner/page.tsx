"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import TripForm from "@/components/TripForm";
import CostReceipt from "@/components/CostReceipt";
import Itinerary from "@/components/Itinerary";
import { TripPlan, TripCostSummary } from "@/lib/types";
import { calculateTripCosts } from "@/lib/tripCalculator";

export default function PlannerPage() {
  const [summary, setSummary] = useState<TripCostSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"receipt" | "itinerary">("receipt");
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (plan: TripPlan) => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    const result = calculateTripCosts(plan);
    setSummary(result);
    setIsLoading(false);
    setActiveTab("receipt");

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Plan Your Business Trip
            </h1>
            <p className="text-sm text-gray-400">
              Add your destinations and dates. We&apos;ll calculate every cost.
            </p>
          </div>

          {/* Trip Route Visual */}
          <div className="mb-8">
            <TripForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Results */}
          {summary && (
            <div ref={resultsRef} className="mt-12 pt-8 border-t border-gray-100">
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-8">
                <button
                  onClick={() => setActiveTab("receipt")}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "receipt"
                      ? "bg-gray-900 text-white shadow-btn"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Cost Breakdown
                </button>
                <button
                  onClick={() => setActiveTab("itinerary")}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "itinerary"
                      ? "bg-gray-900 text-white shadow-btn"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Itinerary & Schedule
                </button>
              </div>

              {activeTab === "receipt" && <CostReceipt summary={summary} />}
              {activeTab === "itinerary" && <Itinerary summary={summary} />}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
