import {
  TripPlan,
  TripCostSummary,
  DestinationCost,
  TransportOption,
  FoodBreakdown,
  FlightPriority,
} from "./types";
import { getCityData, generateFlightOptions } from "./costData";

function nightsBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
}

export function calculateTripCosts(plan: TripPlan): TripCostSummary {
  const destinations: DestinationCost[] = [];
  let totalFlightCost = 0;
  let totalTransportCost = 0;
  let totalFoodCost = 0;
  let totalHotelCost = 0;
  const localCurrencyTotals: { currency: string; amount: number; destination: string }[] = [];

  const homeTimezone = plan.legs[0]?.from
    ? getCityData(plan.legs[0].from.city).timezoneOffset
    : 9;

  for (let i = 0; i < plan.legs.length; i++) {
    const leg = plan.legs[i];
    if (!leg.from || !leg.to) continue;

    const nextLeg = plan.legs[i + 1];
    const arrivalDate = leg.departureDate;
    const departureDate = nextLeg?.departureDate || leg.departureDate;

    const totalNights = nightsBetween(arrivalDate, departureDate);
    const totalDays = totalNights + 1;

    const cityData = getCityData(leg.to.city);

    const flights = generateFlightOptions(
      leg.from.code,
      leg.to.code,
      leg.departureDate,
      plan.flightPriority
    );
    const selectedFlight = flights[0] || null;
    const flightCost = selectedFlight?.price || 0;

    if (leg.isReturn) {
      totalFlightCost += flightCost;

      const timeDiff = cityData.timezoneOffset - homeTimezone;
      const timeDiffStr =
        timeDiff === 0
          ? "Same timezone"
          : `${timeDiff > 0 ? "+" : ""}${timeDiff}h from home`;

      destinations.push({
        destination: leg.to,
        arrivalDate,
        departureDate: arrivalDate,
        totalNights: 0,
        totalDays: 0,
        flights,
        selectedFlight,
        transport: [],
        food: { mealsPerDay: 0, totalDays: 0, mealOptions: [], avgDailyCost: 0, totalCost: 0, currency: "USD" },
        hotels: [],
        selectedHotel: null,
        transportTotal: 0,
        subtotal: Math.round(flightCost * 100) / 100,
        timezone: cityData.timezone,
        timezoneOffset: cityData.timezoneOffset,
        homeTimezoneOffset: homeTimezone,
        timezoneDifference: timeDiffStr,
        isReturn: true,
      });
      continue;
    }

    const transport: TransportOption[] = cityData.transport.options.map((opt) => {
      const days = opt.tripsPerDay === 0 ? 1 : totalDays;
      const trips = opt.tripsPerDay === 0 ? 2 : opt.tripsPerDay;
      const total = opt.costPerTrip * trips * (opt.tripsPerDay === 0 ? 1 : days);
      return {
        ...opt,
        totalDays: days,
        totalCost: Math.round(total * 100) / 100,
      };
    });

    const transportTotal = transport.reduce((sum, t) => sum + t.totalCost, 0);

    const avgMealCost =
      cityData.meals.reduce((sum, m) => sum + m.avgCost, 0) / cityData.meals.length;

    const food: FoodBreakdown = {
      mealsPerDay: plan.mealsPerDay,
      totalDays,
      mealOptions: cityData.meals,
      avgDailyCost: Math.round(avgMealCost * plan.mealsPerDay * 100) / 100,
      totalCost: Math.round(avgMealCost * plan.mealsPerDay * totalDays * 100) / 100,
      currency: "USD",
    };

    const agodaBaseUrl = "https://www.agoda.com/search";
    const checkIn = arrivalDate;
    const checkOut = departureDate || arrivalDate;
    const cityQuery = encodeURIComponent(leg.to.city);

    const hotels = cityData.hotels.map((h) => ({
      ...h,
      totalNights,
      totalCost: h.pricePerNight * totalNights,
      bookingUrl: `${agodaBaseUrl}?city=${cityQuery}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=1&adults=1&los=${totalNights}&cid=1922868`,
    }));

    const selectedHotel = hotels.find((h) => h.stars === Math.min(plan.hotelStars, 5)) || hotels[0];

    const hotelCost = selectedHotel?.totalCost || 0;
    const subtotal = flightCost + transportTotal + food.totalCost + hotelCost;

    totalFlightCost += flightCost;
    totalTransportCost += transportTotal;
    totalFoodCost += food.totalCost;
    totalHotelCost += hotelCost;

    if (cityData.currency !== "USD") {
      localCurrencyTotals.push({
        currency: cityData.currency,
        amount: Math.round((transportTotal + food.totalCost + hotelCost) / cityData.exchangeRateToUSD),
        destination: leg.to.city,
      });
    }

    const timeDiff = cityData.timezoneOffset - homeTimezone;
    const timeDiffStr =
      timeDiff === 0
        ? "Same timezone"
        : `${timeDiff > 0 ? "+" : ""}${timeDiff}h from home`;

    destinations.push({
      destination: leg.to,
      arrivalDate,
      departureDate,
      totalNights,
      totalDays,
      flights,
      selectedFlight,
      transport,
      food,
      hotels,
      selectedHotel,
      transportTotal: Math.round(transportTotal * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      timezone: cityData.timezone,
      timezoneOffset: cityData.timezoneOffset,
      homeTimezoneOffset: homeTimezone,
      timezoneDifference: timeDiffStr,
      isReturn: false,
    });
  }

  return {
    destinations,
    totalFlightCost: Math.round(totalFlightCost * 100) / 100,
    totalTransportCost: Math.round(totalTransportCost * 100) / 100,
    totalFoodCost: Math.round(totalFoodCost * 100) / 100,
    totalHotelCost: Math.round(totalHotelCost * 100) / 100,
    grandTotal: Math.round(
      (totalFlightCost + totalTransportCost + totalFoodCost + totalHotelCost) * 100
    ) / 100,
    currency: "USD",
    localCurrencyTotals,
  };
}
