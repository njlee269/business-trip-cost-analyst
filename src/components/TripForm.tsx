"use client";

import { useState } from "react";
import { Airport, TripLeg, TripPlan } from "@/lib/types";
import AirportSearch from "./AirportSearch";

interface TripFormProps {
  onSubmit: (plan: TripPlan) => void;
  isLoading: boolean;
}

let legCounter = 0;
function createLeg(from: Airport | null = null, to: Airport | null = null, isReturn = false): TripLeg {
  legCounter++;
  return {
    id: `leg-${legCounter}-${Date.now()}`,
    from,
    to,
    departureDate: "",
    isReturn,
  };
}

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [legs, setLegs] = useState<TripLeg[]>([createLeg()]);
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [hotelStars, setHotelStars] = useState(4);

  const origin = legs[0]?.from;

  const updateLeg = (index: number, updates: Partial<TripLeg>) => {
    setLegs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      if (index === 0 && updates.from) {
        for (let i = 1; i < next.length; i++) {
          if (next[i].isReturn) {
            next[i] = { ...next[i], to: updates.from };
          }
        }
      }
      return next;
    });
  };

  const addDestination = () => {
    const lastLeg = legs[legs.length - 1];
    const fromAirport = lastLeg?.to || null;
    setLegs((prev) => [...prev, createLeg(fromAirport)]);
  };

  const addReturnHome = () => {
    const lastLeg = legs[legs.length - 1];
    const fromAirport = lastLeg?.to || null;
    setLegs((prev) => [...prev, createLeg(fromAirport, origin, true)]);
  };

  const removeLeg = (index: number) => {
    if (index === 0) return;
    setLegs((prev) => {
      const next = prev.filter((_, i) => i !== index);
      for (let i = 1; i < next.length; i++) {
        next[i] = { ...next[i], from: next[i - 1].to || null };
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const plan: TripPlan = {
      legs,
      mealsPerDay,
      hotelStars,
      travelers: 1,
    };
    onSubmit(plan);
  };

  const isValid = legs.every(
    (leg) => leg.from && leg.to && leg.departureDate
  );

  const hasReturnLeg = legs.some((l) => l.isReturn);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {legs.map((leg, index) => (
          <div
            key={leg.id}
            className={`glass-card p-5 ${index > 0 ? "destination-connector" : ""}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    leg.isReturn
                      ? "bg-gray-200 text-gray-600"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  {leg.isReturn ? "↩" : index + 1}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {index === 0
                    ? "Starting Point"
                    : leg.isReturn
                    ? "Return Home"
                    : `Destination ${index}`}
                </span>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeLeg(index)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-sm p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AirportSearch
                value={leg.from}
                onChange={(airport) => updateLeg(index, { from: airport })}
                placeholder="Search city or airport..."
                label={index === 0 ? "From" : "From (auto)"}
                disabled={index > 0}
              />

              <AirportSearch
                value={leg.to}
                onChange={(airport) => updateLeg(index, { to: airport })}
                placeholder="Search destination..."
                label="To"
                disabled={leg.isReturn}
              />

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={leg.departureDate}
                  onChange={(e) =>
                    updateLeg(index, { departureDate: e.target.value })
                  }
                  className="glass-input text-sm"
                  min={
                    index > 0 && legs[index - 1]?.departureDate
                      ? legs[index - 1].departureDate
                      : new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={addDestination} className="glass-button text-sm group">
          <span className="inline-flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs transition-colors">
              +
            </span>
            Add Destination
          </span>
        </button>

        {origin && !hasReturnLeg && (
          <button onClick={addReturnHome} className="glass-button text-sm group">
            <span className="inline-flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs transition-colors">
                ↩
              </span>
              Back Home ({origin.city})
            </span>
          </button>
        )}
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-medium text-gray-600 mb-4">
          Trip Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
              Meals per Day
            </label>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setMealsPerDay(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    mealsPerDay === n
                      ? "bg-gray-900 text-white shadow-btn"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {n} meal{n > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
              Hotel Preference
            </label>
            <div className="flex gap-2">
              {[3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setHotelStars(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    hotelStars === n
                      ? "bg-gray-900 text-white shadow-btn"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {"★".repeat(n)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className={`w-full py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
          isValid && !isLoading
            ? "glass-button-primary !py-4 !text-base"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing your trip...
          </span>
        ) : (
          "Calculate Trip Cost"
        )}
      </button>
    </div>
  );
}
