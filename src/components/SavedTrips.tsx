"use client";

import { useState, useEffect } from "react";
import { SavedTrip, TripCostSummary } from "@/lib/types";
import { getSavedTrips, deleteSavedTrip, clearSavedTrips } from "@/lib/savedTrips";

interface SavedTripsProps {
  onLoadTrip: (summary: TripCostSummary) => void;
}

export default function SavedTrips({ onLoadTrip }: SavedTripsProps) {
  const [trips, setTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    setTrips(getSavedTrips());
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedTrip(id);
    setTrips(getSavedTrips());
  };

  const handleClearAll = () => {
    clearSavedTrips();
    setTrips([]);
  };

  if (trips.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-4xl mb-4 opacity-30">📂</div>
        <h3 className="text-lg font-semibold text-gray-400 mb-2">No Saved Trips</h3>
        <p className="text-sm text-gray-300">
          Calculate a trip cost and hit &quot;Save Trip Plan&quot; to keep it here for comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Saved Trips</h2>
          <p className="text-xs text-gray-400">{trips.length} trip{trips.length !== 1 ? "s" : ""} saved</p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {trips.map((trip) => {
          const date = new Date(trip.createdAt);
          const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

          return (
            <div
              key={trip.id}
              className="glass-card p-4 group hover:border-gray-300/60 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {trip.destinations.map((dest, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-sm">
                        <span className="font-medium text-gray-800 truncate">{dest.split(" (")[0]}</span>
                        {i < trip.destinations.length - 1 && (
                          <span className="text-gray-300">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{dateStr}</span>
                    <span>·</span>
                    <span>{trip.summary.destinations.length} destination{trip.summary.destinations.length !== 1 ? "s" : ""}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-gray-900">
                    ${trip.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase">{trip.currency}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => onLoadTrip(trip.summary)}
                  className="flex-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 py-2 rounded-lg transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-xs text-gray-300 hover:text-red-400 py-2 px-3 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
