"use client";

import { TripCostSummary, DestinationCost } from "@/lib/types";
import FlightCard from "./FlightCard";
import { useState } from "react";

interface CostReceiptProps {
  summary: TripCostSummary;
}

function DestinationSection({ dest, index }: { dest: DestinationCost; index: number }) {
  const [selectedFlightIdx, setSelectedFlightIdx] = useState(0);
  const [showAllFlights, setShowAllFlights] = useState(false);
  const displayedFlights = showAllFlights ? dest.flights : dest.flights.slice(0, 2);

  return (
    <div className="receipt-section animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Destination Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {index + 1}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {dest.destination.city}, {dest.destination.country}
            </h3>
            <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>{dest.arrivalDate} → {dest.departureDate}</span>
              <span className="hidden sm:inline">·</span>
              <span>{dest.totalNights} night{dest.totalNights !== 1 ? "s" : ""}, {dest.totalDays} day{dest.totalDays !== 1 ? "s" : ""}</span>
              <span className="hidden sm:inline">·</span>
              <span>{dest.timezone}</span>
            </div>
          </div>
        </div>
        <div className="sm:ml-auto text-left sm:text-right pl-11 sm:pl-0 flex-shrink-0">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Timezone</div>
          <div className="text-sm font-medium text-gray-600">{dest.timezoneDifference}</div>
        </div>
      </div>

      {/* Flights */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>✈️</span> Flight Options
          </h4>
          <span className="text-sm font-semibold text-gray-700">
            ${dest.selectedFlight?.price.toLocaleString() || "—"}
          </span>
        </div>
        <div className="space-y-2">
          {displayedFlights.map((flight, fi) => (
            <FlightCard
              key={fi}
              flight={flight}
              isSelected={fi === selectedFlightIdx}
              onSelect={() => setSelectedFlightIdx(fi)}
            />
          ))}
        </div>
        {dest.flights.length > 2 && (
          <button
            onClick={() => setShowAllFlights(!showAllFlights)}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showAllFlights
              ? "Show less"
              : `+${dest.flights.length - 2} more flight options`}
          </button>
        )}
      </div>

      {/* Transportation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>🚗</span> Transportation
          </h4>
          <span className="text-sm font-semibold text-gray-700">
            ${dest.transportTotal.toLocaleString()}
          </span>
        </div>
        {/* Mobile: card layout, Desktop: table */}
        <div className="hidden sm:block bg-gray-50/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400">
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Per Trip</th>
                <th className="text-left p-3 font-medium">Frequency</th>
                <th className="text-right p-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {dest.transport.map((t, ti) => (
                <tr key={ti} className="border-t border-gray-100/80">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <div>
                        <div className="font-medium text-gray-700 text-xs">{t.type}</div>
                        <div className="text-[10px] text-gray-400">{t.notes}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 text-xs">${t.costPerTrip}</td>
                  <td className="p-3 text-gray-600 text-xs">
                    {t.tripsPerDay === 0
                      ? "2× (arr+dep)"
                      : `${t.tripsPerDay}×/day · ${t.totalDays}d`}
                  </td>
                  <td className="p-3 text-right font-medium text-gray-800 text-xs">
                    ${t.totalCost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden space-y-2">
          {dest.transport.map((t, ti) => (
            <div key={ti} className="bg-gray-50/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span>{t.icon}</span>
                  <span className="font-medium text-gray-700 text-xs">{t.type}</span>
                </div>
                <span className="font-medium text-gray-800 text-xs">${t.totalCost.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-gray-400 pl-6">
                ${t.costPerTrip}/trip · {t.tripsPerDay === 0
                  ? "2× (arr+dep)"
                  : `${t.tripsPerDay}×/day · ${t.totalDays}d`}
              </div>
              {t.notes && <div className="text-[10px] text-gray-400 pl-6 mt-0.5">{t.notes}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Food */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>🍽️</span> Food & Dining ({dest.food.mealsPerDay} meals/day)
          </h4>
          <span className="text-sm font-semibold text-gray-700">
            ${dest.food.totalCost.toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {dest.food.mealOptions.map((meal, mi) => (
            <div key={mi} className="bg-gray-50/50 rounded-xl p-2 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase mb-1">{meal.label}</div>
              <div className="text-sm font-semibold text-gray-700">${meal.avgCost}</div>
              <div className="text-[9px] sm:text-[10px] text-gray-400">per meal</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400">
          Average daily: ${dest.food.avgDailyCost} × {dest.food.totalDays} days = ${dest.food.totalCost.toLocaleString()}
        </div>
      </div>

      {/* Hotels */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>🏨</span> Hotel Options ({dest.totalNights} night{dest.totalNights !== 1 ? "s" : ""})
          </h4>
          <span className="text-sm font-semibold text-gray-700">
            ${dest.selectedHotel?.totalCost.toLocaleString() || "—"}
          </span>
        </div>
        <div className="space-y-2">
          {dest.hotels.map((hotel, hi) => (
            <div
              key={hi}
              className={`p-3 rounded-xl border transition-all ${
                dest.selectedHotel?.name === hotel.name
                  ? "border-gray-400 bg-gray-50/80"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-medium text-gray-800">{hotel.name}</div>
                  <div className="text-xs text-gray-400">
                    {"★".repeat(hotel.stars)} · {hotel.neighborhood} · {hotel.rating}/5
                  </div>
                </div>
                <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-0">
                  <div className="text-sm font-semibold text-gray-800">
                    ${hotel.pricePerNight}/night
                  </div>
                  <div className="text-xs text-gray-400">
                    Total: ${hotel.totalCost.toLocaleString()}
                  </div>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg transition-all sm:mt-1 ml-auto sm:ml-0"
                  >
                    Book on Agoda →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Subtotal */}
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
        <span className="text-sm font-medium text-gray-500">Destination Subtotal</span>
        <span className="text-lg font-bold text-gray-900">
          ${dest.subtotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function CostReceipt({ summary }: CostReceiptProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full text-xs text-gray-500 mb-4">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Cost analysis complete
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Trip Cost Breakdown</h2>
        <p className="text-sm text-gray-400">
          Detailed receipt for {summary.destinations.length} destination{summary.destinations.length > 1 ? "s" : ""}
        </p>
      </div>

      {summary.destinations.map((dest, i) => (
        <DestinationSection key={i} dest={dest} index={i} />
      ))}

      {/* Grand Total Receipt */}
      <div className="glass-card p-4 sm:p-6 !border-gray-300/60">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Total Trip Cost Summary
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <span>✈️</span> Total Flights
            </span>
            <span className="font-medium text-gray-800">
              ${summary.totalFlightCost.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <span>🚗</span> Total Transportation
            </span>
            <span className="font-medium text-gray-800">
              ${summary.totalTransportCost.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <span>🍽️</span> Total Food & Dining
            </span>
            <span className="font-medium text-gray-800">
              ${summary.totalFoodCost.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <span>🏨</span> Total Accommodation
            </span>
            <span className="font-medium text-gray-800">
              ${summary.totalHotelCost.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-gray-700">Grand Total (USD)</span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${summary.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {summary.localCurrencyTotals.length > 0 && (
          <div className="bg-gray-50/50 rounded-xl p-3 sm:p-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              Local Currency Equivalents
            </div>
            <div className="space-y-1">
              {summary.localCurrencyTotals.map((lc, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{lc.destination}</span>
                  <span className="font-medium text-gray-600">
                    {lc.amount.toLocaleString()} {lc.currency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
