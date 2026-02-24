"use client";

import { TripCostSummary, DestinationCost, HotelOption } from "@/lib/types";
import FlightCard from "./FlightCard";
import { useState, useMemo } from "react";

interface CostReceiptProps {
  summary: TripCostSummary;
}

interface Selections {
  [destIdx: number]: { flightIdx: number; hotelIdx: number };
}

function buildAgodaUrl(hotel: HotelOption, city: string, checkIn: string, checkOut: string, nights: number): string {
  const hotelQuery = encodeURIComponent(`${hotel.name} ${city}`);
  return `https://www.agoda.com/search?q=${hotelQuery}&checkIn=${checkIn}&los=${nights}&checkOut=${checkOut}&rooms=1&adults=1&cid=1922868`;
}

function ReturnFlightSection({
  dest,
  index,
  selectedFlightIdx,
  onSelectFlight,
}: {
  dest: DestinationCost;
  index: number;
  selectedFlightIdx: number;
  onSelectFlight: (idx: number) => void;
}) {
  const [showAllFlights, setShowAllFlights] = useState(false);
  const displayedFlights = showAllFlights ? dest.flights : dest.flights.slice(0, 2);
  const selectedFlight = dest.flights[selectedFlightIdx] || dest.flights[0];

  return (
    <div className="receipt-section animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
            ↩
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              Return Home — {dest.destination.city}
            </h3>
            <div className="text-xs text-gray-400">
              <span>{dest.arrivalDate}</span>
              <span className="ml-2">· Flight only</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>✈️</span> Return Flight
          </h4>
          <span className="text-sm font-semibold text-gray-700">
            ${selectedFlight?.price.toLocaleString() || "—"}
          </span>
        </div>
        <div className="space-y-2">
          {displayedFlights.map((flight, fi) => (
            <FlightCard
              key={fi}
              flight={flight}
              isSelected={fi === selectedFlightIdx}
              onSelect={() => onSelectFlight(fi)}
            />
          ))}
        </div>
        {dest.flights.length > 2 && (
          <button
            onClick={() => setShowAllFlights(!showAllFlights)}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showAllFlights ? "Show less" : `+${dest.flights.length - 2} more flight options`}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
        <span className="text-sm font-medium text-gray-500">Return Flight Cost</span>
        <span className="text-lg font-bold text-gray-900">
          ${selectedFlight?.price.toLocaleString() || "—"}
        </span>
      </div>
    </div>
  );
}

function DestinationSection({
  dest,
  index,
  selectedFlightIdx,
  selectedHotelIdx,
  onSelectFlight,
  onSelectHotel,
}: {
  dest: DestinationCost;
  index: number;
  selectedFlightIdx: number;
  selectedHotelIdx: number;
  onSelectFlight: (idx: number) => void;
  onSelectHotel: (idx: number) => void;
}) {
  const [showAllFlights, setShowAllFlights] = useState(false);
  const displayedFlights = showAllFlights ? dest.flights : dest.flights.slice(0, 2);
  const selectedFlight = dest.flights[selectedFlightIdx] || dest.flights[0];
  const selectedHotel = dest.hotels[selectedHotelIdx] ?? dest.hotels[0];

  const subtotal =
    (selectedFlight?.price || 0) +
    dest.transportTotal +
    dest.food.totalCost +
    (selectedHotel?.totalCost || 0);

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
            ${selectedFlight?.price.toLocaleString() || "—"}
          </span>
        </div>
        <div className="space-y-2">
          {displayedFlights.map((flight, fi) => (
            <FlightCard
              key={fi}
              flight={flight}
              isSelected={fi === selectedFlightIdx}
              onSelect={() => onSelectFlight(fi)}
            />
          ))}
        </div>
        {dest.flights.length > 2 && (
          <button
            onClick={() => setShowAllFlights(!showAllFlights)}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showAllFlights ? "Show less" : `+${dest.flights.length - 2} more flight options`}
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
                    {t.tripsPerDay === 0 ? "2× (arr+dep)" : `${t.tripsPerDay}×/day · ${t.totalDays}d`}
                  </td>
                  <td className="p-3 text-right font-medium text-gray-800 text-xs">${t.totalCost.toLocaleString()}</td>
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
                ${t.costPerTrip}/trip · {t.tripsPerDay === 0 ? "2× (arr+dep)" : `${t.tripsPerDay}×/day · ${t.totalDays}d`}
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
          <span className="text-sm font-semibold text-gray-700">${dest.food.totalCost.toLocaleString()}</span>
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
            ${selectedHotel?.totalCost.toLocaleString() || "—"}
          </span>
        </div>
        <div className="space-y-2">
          {dest.hotels.map((hotel, hi) => {
            const isSelected = hi === selectedHotelIdx;
            const agodaUrl = buildAgodaUrl(hotel, dest.destination.city, dest.arrivalDate, dest.departureDate, dest.totalNights);
            return (
              <button
                key={hi}
                onClick={() => onSelectHotel(hi)}
                className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "border-gray-400 bg-gray-50/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
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
                    <div className="text-sm font-semibold text-gray-800">${hotel.pricePerNight}/night</div>
                    <div className="text-xs text-gray-400">Total: ${hotel.totalCost.toLocaleString()}</div>
                  </div>
                </div>
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <a
                      href={agodaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book on Agoda →
                    </a>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination Subtotal */}
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
        <span className="text-sm font-medium text-gray-500">Destination Subtotal</span>
        <span className="text-lg font-bold text-gray-900">${Math.round(subtotal).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function CostReceipt({ summary }: CostReceiptProps) {
  const initialSelections: Selections = {};
  summary.destinations.forEach((dest, i) => {
    const defaultHotelIdx = dest.hotels.findIndex((h) => h.name === dest.selectedHotel?.name);
    initialSelections[i] = { flightIdx: 0, hotelIdx: Math.max(0, defaultHotelIdx) };
  });

  const [selections, setSelections] = useState<Selections>(initialSelections);

  const setFlight = (destIdx: number, flightIdx: number) => {
    setSelections((prev) => ({ ...prev, [destIdx]: { ...prev[destIdx], flightIdx } }));
  };

  const setHotel = (destIdx: number, hotelIdx: number) => {
    setSelections((prev) => ({ ...prev, [destIdx]: { ...prev[destIdx], hotelIdx } }));
  };

  const totals = useMemo(() => {
    let flights = 0;
    let transport = 0;
    let food = 0;
    let hotels = 0;

    summary.destinations.forEach((dest, i) => {
      const sel = selections[i] || { flightIdx: 0, hotelIdx: 0 };
      const flight = dest.flights[sel.flightIdx] || dest.flights[0];
      flights += flight?.price || 0;

      if (!dest.isReturn) {
        transport += dest.transportTotal;
        food += dest.food.totalCost;
        const hotel = dest.hotels[sel.hotelIdx] ?? dest.hotels[0];
        hotels += hotel?.totalCost || 0;
      }
    });

    return {
      flights: Math.round(flights * 100) / 100,
      transport: Math.round(transport * 100) / 100,
      food: Math.round(food * 100) / 100,
      hotels: Math.round(hotels * 100) / 100,
      grand: Math.round((flights + transport + food + hotels) * 100) / 100,
    };
  }, [selections, summary.destinations]);

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

      {summary.destinations.map((dest, i) =>
        dest.isReturn ? (
          <ReturnFlightSection
            key={i}
            dest={dest}
            index={i}
            selectedFlightIdx={selections[i]?.flightIdx ?? 0}
            onSelectFlight={(idx) => setFlight(i, idx)}
          />
        ) : (
          <DestinationSection
            key={i}
            dest={dest}
            index={i}
            selectedFlightIdx={selections[i]?.flightIdx ?? 0}
            selectedHotelIdx={selections[i]?.hotelIdx ?? 0}
            onSelectFlight={(idx) => setFlight(i, idx)}
            onSelectHotel={(idx) => setHotel(i, idx)}
          />
        )
      )}

      {/* Grand Total Receipt */}
      <div className="receipt-section !border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Total Trip Cost Summary
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><span>✈️</span> Total Flights</span>
            <span className="font-medium text-gray-800">${totals.flights.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><span>🚗</span> Total Transportation</span>
            <span className="font-medium text-gray-800">${totals.transport.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><span>🍽️</span> Total Food & Dining</span>
            <span className="font-medium text-gray-800">${totals.food.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><span>🏨</span> Total Accommodation</span>
            <span className="font-medium text-gray-800">${totals.hotels.toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-semibold text-gray-700">Grand Total (USD)</span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">${totals.grand.toLocaleString()}</span>
          </div>
        </div>

        {summary.localCurrencyTotals.length > 0 && (
          <div className="bg-gray-50/50 rounded-xl p-3 sm:p-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Local Currency Equivalents</div>
            <div className="space-y-1">
              {summary.localCurrencyTotals.map((lc, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{lc.destination}</span>
                  <span className="font-medium text-gray-600">{lc.amount.toLocaleString()} {lc.currency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
