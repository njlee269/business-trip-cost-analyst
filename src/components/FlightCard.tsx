"use client";

import { FlightOption } from "@/lib/types";

interface FlightCardProps {
  flight: FlightOption;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FlightCard({ flight, isSelected, onSelect }: FlightCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
        isSelected
          ? "border-gray-400 bg-gray-50/80 shadow-glass"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-glass"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flight.airlineLogo}</span>
          <div>
            <span className="text-sm font-medium text-gray-800">
              {flight.airline}
            </span>
            <span className="text-xs text-gray-400 ml-2">{flight.flightNumber}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">${flight.price.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 uppercase">per person</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">{flight.departureTime}</div>
          <div className="text-[10px] text-gray-400">DEP</div>
        </div>

        <div className="flex-1 flex items-center gap-1">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="text-[10px] text-gray-400 px-2 py-0.5 bg-gray-50 rounded-full whitespace-nowrap">
            {flight.duration} · {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
          </div>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">{flight.arrivalTime}</div>
          <div className="text-[10px] text-gray-400">ARR</div>
        </div>
      </div>

      {flight.stopCities.length > 0 && (
        <div className="text-xs text-gray-400 mb-2">
          via {flight.stopCities.join(", ")}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              flight.credibilityScore >= 90
                ? "bg-green-50 text-green-600"
                : flight.credibilityScore >= 85
                ? "bg-yellow-50 text-yellow-600"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {flight.credibilityScore}/100 rating
          </span>
        </div>
        <div className="text-[11px] text-gray-400 italic">
          {flight.priceTrend.message}
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <a
            href={flight.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View on Skyscanner →
          </a>
        </div>
      )}
    </button>
  );
}
