import { SavedTrip, TripCostSummary } from "./types";

const STORAGE_KEY = "plano_saved_trips";

export function getSavedTrips(): SavedTrip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTrip(summary: TripCostSummary): SavedTrip {
  const trips = getSavedTrips();
  const destinations = summary.destinations.map(
    (d) => `${d.destination.city} (${d.destination.code})`
  );
  const trip: SavedTrip = {
    id: `trip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    destinations,
    totalCost: summary.grandTotal,
    currency: summary.currency,
    summary,
  };
  trips.unshift(trip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  return trip;
}

export function deleteSavedTrip(id: string): void {
  const trips = getSavedTrips().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function clearSavedTrips(): void {
  localStorage.removeItem(STORAGE_KEY);
}
