"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import TripForm from "@/components/TripForm";
import CostReceipt from "@/components/CostReceipt";
import Itinerary from "@/components/Itinerary";
import SavedTrips from "@/components/SavedTrips";
import { TripPlan, TripCostSummary } from "@/lib/types";
import { calculateTripCosts } from "@/lib/tripCalculator";
import { saveTrip, getSavedTrips } from "@/lib/savedTrips";

export default function PlannerPage() {
  const [summary, setSummary] = useState<TripCostSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"receipt" | "itinerary" | "saved">("receipt");
  const [savedCount, setSavedCount] = useState(0);
  const [justSaved, setJustSaved] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedCount(getSavedTrips().length);
  }, []);

  const handleSubmit = async (plan: TripPlan) => {
    setIsLoading(true);
    setJustSaved(false);

    await new Promise((r) => setTimeout(r, 400));

    const result = calculateTripCosts(plan);
    setSummary(result);
    setIsLoading(false);
    setActiveTab("receipt");

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleSave = () => {
    if (!summary) return;
    saveTrip(summary);
    setSavedCount(getSavedTrips().length);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const handleLoadTrip = (loaded: TripCostSummary) => {
    setSummary(loaded);
    setActiveTab("receipt");
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Plan Your Business Trip
            </h1>
            <p className="text-sm text-gray-400">
              Add your destinations and dates. We&apos;ll calculate every cost.
            </p>
          </div>

          <div className="mb-8">
            <TripForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {(summary || savedCount > 0) && (
            <div ref={resultsRef} className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
                {summary && (
                  <>
                    <button
                      onClick={() => setActiveTab("receipt")}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        activeTab === "receipt"
                          ? "bg-gray-900 text-white shadow-btn"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      Cost Breakdown
                    </button>
                    <button
                      onClick={() => setActiveTab("itinerary")}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        activeTab === "itinerary"
                          ? "bg-gray-900 text-white shadow-btn"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      Schedule
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setActiveTab("saved");
                    setSavedCount(getSavedTrips().length);
                  }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === "saved"
                      ? "bg-gray-900 text-white shadow-btn"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Saved Trips
                  {savedCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === "saved" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {savedCount}
                    </span>
                  )}
                </button>
              </div>

              {activeTab === "receipt" && summary && (
                <div>
                  <CostReceipt summary={summary} />
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleSave}
                      disabled={justSaved}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        justSaved
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : "glass-button-primary"
                      }`}
                    >
                      {justSaved ? (
                        <>
                          <span>✓</span> Trip Saved!
                        </>
                      ) : (
                        <>
                          <span>📂</span> Save Trip Plan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "itinerary" && summary && <Itinerary summary={summary} />}
              {activeTab === "saved" && <SavedTrips onLoadTrip={handleLoadTrip} />}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
