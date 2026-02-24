export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface TripLeg {
  id: string;
  from: Airport | null;
  to: Airport | null;
  departureDate: string;
  isReturn: boolean;
}

export type FlightPriority = "duration" | "rating" | "stops" | "price";

export interface TripPlan {
  legs: TripLeg[];
  mealsPerDay: number;
  hotelStars: number;
  travelers: number;
  flightPriority: FlightPriority;
}

export interface SavedTrip {
  id: string;
  createdAt: string;
  destinations: string[];
  totalCost: number;
  currency: string;
  summary: TripCostSummary;
}

export interface FlightOption {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopCities: string[];
  price: number;
  currency: string;
  bookingUrl: string;
  credibilityScore: number;
  priceTrend: {
    earlierPrice: number;
    laterPrice: number;
    message: string;
  };
}

export interface TransportOption {
  type: string;
  icon: string;
  description: string;
  costPerTrip: number;
  tripsPerDay: number;
  totalDays: number;
  totalCost: number;
  currency: string;
  notes: string;
}

export interface MealCost {
  type: "budget" | "mid" | "fine";
  label: string;
  avgCost: number;
  currency: string;
}

export interface FoodBreakdown {
  mealsPerDay: number;
  totalDays: number;
  mealOptions: MealCost[];
  avgDailyCost: number;
  totalCost: number;
  currency: string;
}

export interface HotelOption {
  name: string;
  stars: number;
  pricePerNight: number;
  totalNights: number;
  totalCost: number;
  currency: string;
  rating: number;
  bookingUrl: string;
  imageUrl: string;
  neighborhood: string;
}

export interface DestinationCost {
  destination: Airport;
  arrivalDate: string;
  departureDate: string;
  totalNights: number;
  totalDays: number;
  flights: FlightOption[];
  selectedFlight: FlightOption | null;
  transport: TransportOption[];
  food: FoodBreakdown;
  hotels: HotelOption[];
  selectedHotel: HotelOption | null;
  transportTotal: number;
  subtotal: number;
  timezone: string;
  timezoneOffset: number;
  homeTimezoneOffset: number;
  timezoneDifference: string;
  isReturn: boolean;
}

export interface TripCostSummary {
  destinations: DestinationCost[];
  totalFlightCost: number;
  totalTransportCost: number;
  totalFoodCost: number;
  totalHotelCost: number;
  grandTotal: number;
  currency: string;
  localCurrencyTotals: { currency: string; amount: number; destination: string }[];
}

export interface ItineraryItem {
  time: string;
  localTime: string;
  homeTime: string;
  activity: string;
  icon: string;
  notes?: string;
}

export interface DayItinerary {
  date: string;
  dayNumber: number;
  destination: string;
  items: ItineraryItem[];
}
