import { TransportOption, MealCost, HotelOption, FlightOption, FlightPriority } from "./types";

interface CityData {
  transport: {
    mainMode: string;
    options: Omit<TransportOption, "totalDays" | "totalCost">[];
  };
  meals: MealCost[];
  hotels: Omit<HotelOption, "totalNights" | "totalCost">[];
  timezone: string;
  timezoneOffset: number;
  currency: string;
  currencySymbol: string;
  exchangeRateToUSD: number;
  airportToHotelKm: number;
  airportToHotelMinutes: number;
}

const cityDatabase: Record<string, CityData> = {
  Dubai: {
    transport: {
      mainMode: "Uber / Metro",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber (avg city ride)", costPerTrip: 8, tripsPerDay: 4, currency: "USD", notes: "RTA Taxi also available at similar rates" },
        { type: "Airport Transfer", icon: "✈️", description: "Airport to hotel area (Uber/Taxi)", costPerTrip: 25, tripsPerDay: 0, currency: "USD", notes: "~30-45 min to Downtown/Marina" },
        { type: "Metro", icon: "🚇", description: "Dubai Metro (Red/Green line)", costPerTrip: 1.5, tripsPerDay: 4, currency: "USD", notes: "Clean, efficient, covers main business areas" },
      ],
    },
    meals: [
      { type: "budget", label: "Local / Casual Dining", avgCost: 12, currency: "USD" },
      { type: "mid", label: "Mid-range Restaurant", avgCost: 35, currency: "USD" },
      { type: "fine", label: "Fine Dining / Client Dinner", avgCost: 85, currency: "USD" },
    ],
    hotels: [
      { name: "Rove Downtown", stars: 3, pricePerNight: 85, currency: "USD", rating: 4.3, bookingUrl: "https://www.agoda.com/search/hotel/ae/rove-downtown.html", imageUrl: "", neighborhood: "Downtown Dubai" },
      { name: "Hilton Dubai Al Habtoor City", stars: 4, pricePerNight: 150, currency: "USD", rating: 4.5, bookingUrl: "https://www.agoda.com/search/hotel/ae/hilton-dubai-al-habtoor-city.html", imageUrl: "", neighborhood: "Al Habtoor City" },
      { name: "JW Marriott Marquis", stars: 5, pricePerNight: 220, currency: "USD", rating: 4.7, bookingUrl: "https://www.agoda.com/search/hotel/ae/jw-marriott-marquis-dubai.html", imageUrl: "", neighborhood: "Business Bay" },
      { name: "Atlantis The Royal", stars: 5, pricePerNight: 450, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search/hotel/ae/atlantis-the-royal.html", imageUrl: "", neighborhood: "Palm Jumeirah" },
    ],
    timezone: "GST (UTC+4)",
    timezoneOffset: 4,
    currency: "AED",
    currencySymbol: "د.إ",
    exchangeRateToUSD: 0.27,
    airportToHotelKm: 25,
    airportToHotelMinutes: 35,
  },
  Miami: {
    transport: {
      mainMode: "Uber / Metrorail",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber (avg city ride)", costPerTrip: 15, tripsPerDay: 4, currency: "USD", notes: "Prices surge during events and rush hours" },
        { type: "Airport Transfer", icon: "✈️", description: "Airport to hotel area (Uber)", costPerTrip: 25, tripsPerDay: 0, currency: "USD", notes: "~25-40 min to South Beach/Downtown" },
        { type: "Metrorail", icon: "🚇", description: "Miami-Dade Metrorail", costPerTrip: 2.25, tripsPerDay: 3, currency: "USD", notes: "Limited coverage, good for Downtown-Airport route" },
      ],
    },
    meals: [
      { type: "budget", label: "Casual / Fast-casual", avgCost: 15, currency: "USD" },
      { type: "mid", label: "Mid-range Restaurant", avgCost: 45, currency: "USD" },
      { type: "fine", label: "Fine Dining / Client Dinner", avgCost: 120, currency: "USD" },
    ],
    hotels: [
      { name: "Hampton Inn Miami Brickell", stars: 3, pricePerNight: 140, currency: "USD", rating: 4.2, bookingUrl: "https://www.agoda.com/search/hotel/us/hampton-inn-miami-brickell.html", imageUrl: "", neighborhood: "Brickell" },
      { name: "Hyatt Regency Miami", stars: 4, pricePerNight: 200, currency: "USD", rating: 4.4, bookingUrl: "https://www.agoda.com/search/hotel/us/hyatt-regency-miami.html", imageUrl: "", neighborhood: "Downtown" },
      { name: "Four Seasons Miami", stars: 5, pricePerNight: 380, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search/hotel/us/four-seasons-miami.html", imageUrl: "", neighborhood: "Brickell" },
      { name: "Mandarin Oriental Miami", stars: 5, pricePerNight: 450, currency: "USD", rating: 4.7, bookingUrl: "https://www.agoda.com/search/hotel/us/mandarin-oriental-miami.html", imageUrl: "", neighborhood: "Brickell Key" },
    ],
    timezone: "EST (UTC-5)",
    timezoneOffset: -5,
    currency: "USD",
    currencySymbol: "$",
    exchangeRateToUSD: 1,
    airportToHotelKm: 15,
    airportToHotelMinutes: 30,
  },
  "New York": {
    transport: {
      mainMode: "Subway / Uber",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber (avg city ride)", costPerTrip: 20, tripsPerDay: 3, currency: "USD", notes: "Yellow cabs also widely available" },
        { type: "Airport Transfer", icon: "✈️", description: "JFK to Manhattan (Uber/Taxi)", costPerTrip: 55, tripsPerDay: 0, currency: "USD", notes: "~45-75 min depending on traffic" },
        { type: "Subway", icon: "🚇", description: "NYC Subway (MTA)", costPerTrip: 2.90, tripsPerDay: 4, currency: "USD", notes: "Extensive coverage, 24/7 service" },
      ],
    },
    meals: [
      { type: "budget", label: "Deli / Fast-casual", avgCost: 18, currency: "USD" },
      { type: "mid", label: "Mid-range Restaurant", avgCost: 55, currency: "USD" },
      { type: "fine", label: "Fine Dining / Client Dinner", avgCost: 150, currency: "USD" },
    ],
    hotels: [
      { name: "Pod 51", stars: 3, pricePerNight: 160, currency: "USD", rating: 4.1, bookingUrl: "https://www.agoda.com/search/hotel/us/pod-51.html", imageUrl: "", neighborhood: "Midtown East" },
      { name: "The Manhattan at Times Square", stars: 4, pricePerNight: 230, currency: "USD", rating: 4.3, bookingUrl: "https://www.agoda.com/search/hotel/us/the-manhattan-times-square.html", imageUrl: "", neighborhood: "Midtown" },
      { name: "The Peninsula New York", stars: 5, pricePerNight: 550, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search/hotel/us/the-peninsula-new-york.html", imageUrl: "", neighborhood: "Fifth Avenue" },
    ],
    timezone: "EST (UTC-5)",
    timezoneOffset: -5,
    currency: "USD",
    currencySymbol: "$",
    exchangeRateToUSD: 1,
    airportToHotelKm: 25,
    airportToHotelMinutes: 55,
  },
  London: {
    transport: {
      mainMode: "Tube / Uber",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber (avg city ride)", costPerTrip: 18, tripsPerDay: 3, currency: "USD", notes: "Black cabs also available" },
        { type: "Airport Transfer", icon: "✈️", description: "Heathrow to Central London", costPerTrip: 30, tripsPerDay: 0, currency: "USD", notes: "Heathrow Express: 15 min, Tube: 50 min" },
        { type: "Tube", icon: "🚇", description: "London Underground", costPerTrip: 3.5, tripsPerDay: 4, currency: "USD", notes: "Oyster card recommended, extensive network" },
      ],
    },
    meals: [
      { type: "budget", label: "Pub Lunch / Casual", avgCost: 16, currency: "USD" },
      { type: "mid", label: "Mid-range Restaurant", avgCost: 50, currency: "USD" },
      { type: "fine", label: "Fine Dining / Client Dinner", avgCost: 130, currency: "USD" },
    ],
    hotels: [
      { name: "Premier Inn London City", stars: 3, pricePerNight: 130, currency: "USD", rating: 4.2, bookingUrl: "https://www.agoda.com/search/hotel/gb/premier-inn-london-city.html", imageUrl: "", neighborhood: "City of London" },
      { name: "DoubleTree by Hilton Tower of London", stars: 4, pricePerNight: 210, currency: "USD", rating: 4.4, bookingUrl: "https://www.agoda.com/search/hotel/gb/doubletree-tower-london.html", imageUrl: "", neighborhood: "Tower Hill" },
      { name: "The Savoy", stars: 5, pricePerNight: 600, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search/hotel/gb/the-savoy.html", imageUrl: "", neighborhood: "Covent Garden" },
    ],
    timezone: "GMT (UTC+0)",
    timezoneOffset: 0,
    currency: "GBP",
    currencySymbol: "£",
    exchangeRateToUSD: 1.27,
    airportToHotelKm: 30,
    airportToHotelMinutes: 50,
  },
  Tokyo: {
    transport: {
      mainMode: "Train / Subway",
      options: [
        { type: "Taxi", icon: "🚕", description: "Taxi (avg city ride)", costPerTrip: 12, tripsPerDay: 2, currency: "USD", notes: "Clean and reliable but expensive" },
        { type: "Airport Transfer", icon: "✈️", description: "Narita Express to Tokyo Station", costPerTrip: 22, tripsPerDay: 0, currency: "USD", notes: "~60 min express train" },
        { type: "Subway/Train", icon: "🚇", description: "Tokyo Metro + JR Lines", costPerTrip: 2, tripsPerDay: 5, currency: "USD", notes: "Suica/Pasmo card, world-class network" },
      ],
    },
    meals: [
      { type: "budget", label: "Ramen / Bento / Yoshinoya", avgCost: 8, currency: "USD" },
      { type: "mid", label: "Izakaya / Mid-range", avgCost: 30, currency: "USD" },
      { type: "fine", label: "Fine Dining / Omakase", avgCost: 120, currency: "USD" },
    ],
    hotels: [
      { name: "Tokyu Stay Shinjuku", stars: 3, pricePerNight: 90, currency: "USD", rating: 4.3, bookingUrl: "https://www.agoda.com/search/hotel/jp/tokyu-stay-shinjuku.html", imageUrl: "", neighborhood: "Shinjuku" },
      { name: "Mitsui Garden Hotel Ginza", stars: 4, pricePerNight: 170, currency: "USD", rating: 4.5, bookingUrl: "https://www.agoda.com/search/hotel/jp/mitsui-garden-ginza.html", imageUrl: "", neighborhood: "Ginza" },
      { name: "Aman Tokyo", stars: 5, pricePerNight: 700, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search/hotel/jp/aman-tokyo.html", imageUrl: "", neighborhood: "Otemachi" },
    ],
    timezone: "JST (UTC+9)",
    timezoneOffset: 9,
    currency: "JPY",
    currencySymbol: "¥",
    exchangeRateToUSD: 0.0067,
    airportToHotelKm: 70,
    airportToHotelMinutes: 60,
  },
  Singapore: {
    transport: {
      mainMode: "MRT / Grab",
      options: [
        { type: "Grab/Uber", icon: "🚗", description: "Grab (avg city ride)", costPerTrip: 10, tripsPerDay: 4, currency: "USD", notes: "Grab is the dominant ride-hailing app" },
        { type: "Airport Transfer", icon: "✈️", description: "Changi to CBD (Grab)", costPerTrip: 18, tripsPerDay: 0, currency: "USD", notes: "~25 min, MRT also available" },
        { type: "MRT", icon: "🚇", description: "Singapore MRT", costPerTrip: 1.5, tripsPerDay: 4, currency: "USD", notes: "Excellent coverage, EZ-Link card" },
      ],
    },
    meals: [
      { type: "budget", label: "Hawker Centre", avgCost: 5, currency: "USD" },
      { type: "mid", label: "Restaurant / Cafe", avgCost: 25, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 100, currency: "USD" },
    ],
    hotels: [
      { name: "ibis Singapore", stars: 3, pricePerNight: 100, currency: "USD", rating: 4.1, bookingUrl: "https://www.agoda.com/search/hotel/sg/ibis-singapore.html", imageUrl: "", neighborhood: "Bencoolen" },
      { name: "Pan Pacific Singapore", stars: 4, pricePerNight: 200, currency: "USD", rating: 4.6, bookingUrl: "https://www.agoda.com/search/hotel/sg/pan-pacific.html", imageUrl: "", neighborhood: "Marina Bay" },
      { name: "Marina Bay Sands", stars: 5, pricePerNight: 400, currency: "USD", rating: 4.7, bookingUrl: "https://www.agoda.com/search/hotel/sg/marina-bay-sands.html", imageUrl: "", neighborhood: "Marina Bay" },
    ],
    timezone: "SGT (UTC+8)",
    timezoneOffset: 8,
    currency: "SGD",
    currencySymbol: "S$",
    exchangeRateToUSD: 0.75,
    airportToHotelKm: 20,
    airportToHotelMinutes: 25,
  },
  Seoul: {
    transport: {
      mainMode: "Subway / Taxi",
      options: [
        { type: "Taxi", icon: "🚕", description: "Taxi (avg city ride)", costPerTrip: 6, tripsPerDay: 3, currency: "USD", notes: "Kakao T app recommended" },
        { type: "Airport Transfer", icon: "✈️", description: "Incheon to Seoul (AREX)", costPerTrip: 8, tripsPerDay: 0, currency: "USD", notes: "AREX Express: 43 min to Seoul Station" },
        { type: "Subway", icon: "🚇", description: "Seoul Metro", costPerTrip: 1, tripsPerDay: 4, currency: "USD", notes: "T-money card, extensive network" },
      ],
    },
    meals: [
      { type: "budget", label: "Korean BBQ / Street Food", avgCost: 7, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 20, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 80, currency: "USD" },
    ],
    hotels: [
      { name: "Nine Tree Premier Myeongdong", stars: 3, pricePerNight: 75, currency: "USD", rating: 4.3, bookingUrl: "https://www.agoda.com/search/hotel/kr/nine-tree-premier-myeongdong.html", imageUrl: "", neighborhood: "Myeongdong" },
      { name: "Lotte Hotel Seoul", stars: 4, pricePerNight: 180, currency: "USD", rating: 4.6, bookingUrl: "https://www.agoda.com/search/hotel/kr/lotte-seoul.html", imageUrl: "", neighborhood: "Jung-gu" },
      { name: "The Shilla Seoul", stars: 5, pricePerNight: 350, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search/hotel/kr/the-shilla-seoul.html", imageUrl: "", neighborhood: "Jung-gu" },
    ],
    timezone: "KST (UTC+9)",
    timezoneOffset: 9,
    currency: "KRW",
    currencySymbol: "₩",
    exchangeRateToUSD: 0.00073,
    airportToHotelKm: 55,
    airportToHotelMinutes: 50,
  },
  "Hong Kong": {
    transport: {
      mainMode: "MTR / Taxi",
      options: [
        { type: "Taxi", icon: "🚕", description: "Taxi (avg city ride)", costPerTrip: 8, tripsPerDay: 3, currency: "USD", notes: "Red taxis for urban areas" },
        { type: "Airport Transfer", icon: "✈️", description: "Airport Express to Central", costPerTrip: 15, tripsPerDay: 0, currency: "USD", notes: "~24 min express train" },
        { type: "MTR", icon: "🚇", description: "Hong Kong MTR", costPerTrip: 1.5, tripsPerDay: 4, currency: "USD", notes: "Octopus card, efficient system" },
      ],
    },
    meals: [
      { type: "budget", label: "Cha Chaan Teng / Street Food", avgCost: 6, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 30, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 110, currency: "USD" },
    ],
    hotels: [
      { name: "Butterfly on Morrison", stars: 3, pricePerNight: 90, currency: "USD", rating: 4.1, bookingUrl: "https://www.agoda.com/search/hotel/hk/butterfly-on-morrison.html", imageUrl: "", neighborhood: "Wan Chai" },
      { name: "Marco Polo Hongkong", stars: 4, pricePerNight: 175, currency: "USD", rating: 4.4, bookingUrl: "https://www.agoda.com/search/hotel/hk/marco-polo-hongkong.html", imageUrl: "", neighborhood: "Tsim Sha Tsui" },
      { name: "The Peninsula Hong Kong", stars: 5, pricePerNight: 500, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search/hotel/hk/the-peninsula.html", imageUrl: "", neighborhood: "Tsim Sha Tsui" },
    ],
    timezone: "HKT (UTC+8)",
    timezoneOffset: 8,
    currency: "HKD",
    currencySymbol: "HK$",
    exchangeRateToUSD: 0.13,
    airportToHotelKm: 35,
    airportToHotelMinutes: 30,
  },
  Paris: {
    transport: {
      mainMode: "Métro / Uber",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber (avg city ride)", costPerTrip: 15, tripsPerDay: 3, currency: "USD", notes: "Also Bolt and local taxis" },
        { type: "Airport Transfer", icon: "✈️", description: "CDG to Paris (RER B)", costPerTrip: 12, tripsPerDay: 0, currency: "USD", notes: "RER B: ~35 min to Châtelet" },
        { type: "Métro", icon: "🚇", description: "Paris Métro", costPerTrip: 2.5, tripsPerDay: 4, currency: "USD", notes: "Navigo card for weekly pass" },
      ],
    },
    meals: [
      { type: "budget", label: "Boulangerie / Bistro", avgCost: 14, currency: "USD" },
      { type: "mid", label: "Brasserie / Restaurant", avgCost: 45, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 140, currency: "USD" },
    ],
    hotels: [
      { name: "ibis Paris Montmartre", stars: 3, pricePerNight: 110, currency: "USD", rating: 4.0, bookingUrl: "https://www.agoda.com/search/hotel/fr/ibis-paris-montmartre.html", imageUrl: "", neighborhood: "Montmartre" },
      { name: "Hôtel Monge", stars: 4, pricePerNight: 220, currency: "USD", rating: 4.6, bookingUrl: "https://www.agoda.com/search/hotel/fr/hotel-monge.html", imageUrl: "", neighborhood: "Latin Quarter" },
      { name: "Le Bristol Paris", stars: 5, pricePerNight: 800, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search/hotel/fr/le-bristol-paris.html", imageUrl: "", neighborhood: "Faubourg Saint-Honoré" },
    ],
    timezone: "CET (UTC+1)",
    timezoneOffset: 1,
    currency: "EUR",
    currencySymbol: "€",
    exchangeRateToUSD: 1.08,
    airportToHotelKm: 30,
    airportToHotelMinutes: 40,
  },
  "San Francisco": {
    transport: {
      mainMode: "BART / Uber",
      options: [
        { type: "Uber", icon: "🚗", description: "Uber/Lyft (avg city ride)", costPerTrip: 18, tripsPerDay: 3, currency: "USD", notes: "Lyft also very popular" },
        { type: "Airport Transfer", icon: "✈️", description: "SFO to Downtown (BART)", costPerTrip: 10, tripsPerDay: 0, currency: "USD", notes: "~30 min via BART" },
        { type: "BART", icon: "🚇", description: "Bay Area Rapid Transit", costPerTrip: 3, tripsPerDay: 3, currency: "USD", notes: "Clipper card recommended" },
      ],
    },
    meals: [
      { type: "budget", label: "Burrito / Casual", avgCost: 16, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 50, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 140, currency: "USD" },
    ],
    hotels: [
      { name: "HI San Francisco Downtown", stars: 3, pricePerNight: 150, currency: "USD", rating: 4.0, bookingUrl: "https://www.agoda.com/search/hotel/us/hi-sf-downtown.html", imageUrl: "", neighborhood: "Union Square" },
      { name: "Hotel Nikko San Francisco", stars: 4, pricePerNight: 250, currency: "USD", rating: 4.4, bookingUrl: "https://www.agoda.com/search/hotel/us/nikko-san-francisco.html", imageUrl: "", neighborhood: "Union Square" },
      { name: "The St. Regis San Francisco", stars: 5, pricePerNight: 500, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search/hotel/us/st-regis-san-francisco.html", imageUrl: "", neighborhood: "SoMa" },
    ],
    timezone: "PST (UTC-8)",
    timezoneOffset: -8,
    currency: "USD",
    currencySymbol: "$",
    exchangeRateToUSD: 1,
    airportToHotelKm: 20,
    airportToHotelMinutes: 30,
  },
  Bangkok: {
    transport: {
      mainMode: "BTS / Grab",
      options: [
        { type: "Grab", icon: "🚗", description: "Grab (avg city ride)", costPerTrip: 4, tripsPerDay: 4, currency: "USD", notes: "Grab is the main ride-hailing app" },
        { type: "Airport Transfer", icon: "✈️", description: "Suvarnabhumi to CBD", costPerTrip: 8, tripsPerDay: 0, currency: "USD", notes: "Airport Rail Link: ~30 min" },
        { type: "BTS/MRT", icon: "🚇", description: "BTS Skytrain / MRT", costPerTrip: 1.2, tripsPerDay: 4, currency: "USD", notes: "Rabbit card for BTS" },
      ],
    },
    meals: [
      { type: "budget", label: "Street Food / Food Court", avgCost: 3, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 15, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 60, currency: "USD" },
    ],
    hotels: [
      { name: "ibis Bangkok Sukhumvit", stars: 3, pricePerNight: 40, currency: "USD", rating: 4.1, bookingUrl: "https://www.agoda.com/search/hotel/th/ibis-bangkok-sukhumvit.html", imageUrl: "", neighborhood: "Sukhumvit" },
      { name: "Grande Centre Point Ratchadamri", stars: 4, pricePerNight: 90, currency: "USD", rating: 4.5, bookingUrl: "https://www.agoda.com/search/hotel/th/grande-centre-point-ratchadamri.html", imageUrl: "", neighborhood: "Ratchadamri" },
      { name: "Mandarin Oriental Bangkok", stars: 5, pricePerNight: 300, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search/hotel/th/mandarin-oriental.html", imageUrl: "", neighborhood: "Riverside" },
    ],
    timezone: "ICT (UTC+7)",
    timezoneOffset: 7,
    currency: "THB",
    currencySymbol: "฿",
    exchangeRateToUSD: 0.029,
    airportToHotelKm: 30,
    airportToHotelMinutes: 35,
  },
  Jakarta: {
    transport: {
      mainMode: "Grab / TransJakarta",
      options: [
        { type: "Grab", icon: "🚗", description: "Grab (avg city ride)", costPerTrip: 3, tripsPerDay: 4, currency: "USD", notes: "GrabCar or GrabBike" },
        { type: "Airport Transfer", icon: "✈️", description: "CGK to CBD (Sudirman area)", costPerTrip: 15, tripsPerDay: 0, currency: "USD", notes: "~60-90 min depending on traffic" },
        { type: "TransJakarta", icon: "🚌", description: "TransJakarta BRT", costPerTrip: 0.25, tripsPerDay: 3, currency: "USD", notes: "Bus Rapid Transit system" },
        { type: "MRT", icon: "🚇", description: "Jakarta MRT", costPerTrip: 0.7, tripsPerDay: 3, currency: "USD", notes: "North-South line covers CBD" },
      ],
    },
    meals: [
      { type: "budget", label: "Warung / Street Food", avgCost: 3, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 12, currency: "USD" },
      { type: "fine", label: "Fine Dining / Client", avgCost: 50, currency: "USD" },
    ],
    hotels: [
      { name: "Ibis Jakarta Harmoni", stars: 3, pricePerNight: 35, currency: "USD", rating: 4.0, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Harmoni" },
      { name: "Pullman Jakarta Indonesia", stars: 4, pricePerNight: 80, currency: "USD", rating: 4.5, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Thamrin" },
      { name: "The Ritz-Carlton Jakarta", stars: 5, pricePerNight: 180, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Mega Kuningan" },
    ],
    timezone: "WIB (UTC+7)",
    timezoneOffset: 7,
    currency: "IDR",
    currencySymbol: "Rp",
    exchangeRateToUSD: 0.000063,
    airportToHotelKm: 30,
    airportToHotelMinutes: 75,
  },
  Bali: {
    transport: {
      mainMode: "Grab / Private Driver",
      options: [
        { type: "Grab", icon: "🚗", description: "Grab (avg ride)", costPerTrip: 3, tripsPerDay: 3, currency: "USD", notes: "Some areas restrict Grab" },
        { type: "Airport Transfer", icon: "✈️", description: "Airport to Seminyak/Ubud", costPerTrip: 12, tripsPerDay: 0, currency: "USD", notes: "~30-60 min" },
        { type: "Private Driver", icon: "🚐", description: "Daily hire driver", costPerTrip: 35, tripsPerDay: 1, currency: "USD", notes: "Full day with driver, common option" },
      ],
    },
    meals: [
      { type: "budget", label: "Warung / Local", avgCost: 3, currency: "USD" },
      { type: "mid", label: "Café / Restaurant", avgCost: 10, currency: "USD" },
      { type: "fine", label: "Beach Club / Fine Dining", avgCost: 45, currency: "USD" },
    ],
    hotels: [
      { name: "OYO Kuta Beach", stars: 3, pricePerNight: 25, currency: "USD", rating: 3.8, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Kuta" },
      { name: "Alila Seminyak", stars: 4, pricePerNight: 120, currency: "USD", rating: 4.6, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Seminyak" },
      { name: "Four Seasons Jimbaran Bay", stars: 5, pricePerNight: 350, currency: "USD", rating: 4.9, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Jimbaran" },
    ],
    timezone: "WITA (UTC+8)",
    timezoneOffset: 8,
    currency: "IDR",
    currencySymbol: "Rp",
    exchangeRateToUSD: 0.000063,
    airportToHotelKm: 15,
    airportToHotelMinutes: 30,
  },
  Taipei: {
    transport: {
      mainMode: "MRT / Uber",
      options: [
        { type: "Uber/Taxi", icon: "🚗", description: "Uber or taxi (avg ride)", costPerTrip: 5, tripsPerDay: 3, currency: "USD", notes: "Uber or local taxi apps" },
        { type: "Airport Transfer", icon: "✈️", description: "Taoyuan to Taipei Main Station", costPerTrip: 5, tripsPerDay: 0, currency: "USD", notes: "Airport MRT Express ~35 min" },
        { type: "MRT", icon: "🚇", description: "Taipei Metro MRT", costPerTrip: 0.8, tripsPerDay: 4, currency: "USD", notes: "Excellent coverage, EasyCard accepted" },
      ],
    },
    meals: [
      { type: "budget", label: "Night Market / Local", avgCost: 4, currency: "USD" },
      { type: "mid", label: "Restaurant", avgCost: 15, currency: "USD" },
      { type: "fine", label: "Fine Dining", avgCost: 60, currency: "USD" },
    ],
    hotels: [
      { name: "CityInn Plus Ximending", stars: 3, pricePerNight: 55, currency: "USD", rating: 4.2, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Ximending" },
      { name: "Regent Taipei", stars: 4, pricePerNight: 130, currency: "USD", rating: 4.6, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Zhongshan" },
      { name: "Mandarin Oriental Taipei", stars: 5, pricePerNight: 280, currency: "USD", rating: 4.8, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "Songshan" },
    ],
    timezone: "CST (UTC+8)",
    timezoneOffset: 8,
    currency: "TWD",
    currencySymbol: "NT$",
    exchangeRateToUSD: 0.031,
    airportToHotelKm: 35,
    airportToHotelMinutes: 40,
  },
};

const defaultCityData: CityData = {
  transport: {
    mainMode: "Taxi / Public Transit",
    options: [
      { type: "Taxi/Uber", icon: "🚗", description: "Taxi or ride-hailing (avg ride)", costPerTrip: 12, tripsPerDay: 4, currency: "USD", notes: "Check local ride-hailing apps" },
      { type: "Airport Transfer", icon: "✈️", description: "Airport to hotel area", costPerTrip: 30, tripsPerDay: 0, currency: "USD", notes: "Estimated average" },
      { type: "Public Transit", icon: "🚇", description: "Local public transport", costPerTrip: 2, tripsPerDay: 4, currency: "USD", notes: "Check local transit options" },
    ],
  },
  meals: [
    { type: "budget", label: "Budget / Local", avgCost: 10, currency: "USD" },
    { type: "mid", label: "Mid-range", avgCost: 35, currency: "USD" },
    { type: "fine", label: "Fine Dining", avgCost: 100, currency: "USD" },
  ],
  hotels: [
    { name: "3-Star Business Hotel", stars: 3, pricePerNight: 100, currency: "USD", rating: 4.0, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "City Center" },
    { name: "4-Star Business Hotel", stars: 4, pricePerNight: 180, currency: "USD", rating: 4.4, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "City Center" },
    { name: "5-Star Luxury Hotel", stars: 5, pricePerNight: 350, currency: "USD", rating: 4.7, bookingUrl: "https://www.agoda.com/search", imageUrl: "", neighborhood: "City Center" },
  ],
  timezone: "UTC",
  timezoneOffset: 0,
  currency: "USD",
  currencySymbol: "$",
  exchangeRateToUSD: 1,
  airportToHotelKm: 25,
  airportToHotelMinutes: 35,
};

export function getCityData(city: string): CityData {
  return cityDatabase[city] || defaultCityData;
}

export function generateFlightOptions(
  from: string,
  to: string,
  date: string,
  priorities: FlightPriority[] = ["rating"]
): FlightOption[] {
  const airlines = [
    { name: "Korean Air", logo: "🇰🇷", credibility: 92 },
    { name: "Singapore Airlines", logo: "🇸🇬", credibility: 96 },
    { name: "Emirates", logo: "🇦🇪", credibility: 94 },
    { name: "Qatar Airways", logo: "🇶🇦", credibility: 95 },
    { name: "Cathay Pacific", logo: "🇭🇰", credibility: 90 },
    { name: "ANA", logo: "🇯🇵", credibility: 93 },
    { name: "Lufthansa", logo: "🇩🇪", credibility: 88 },
    { name: "British Airways", logo: "🇬🇧", credibility: 87 },
    { name: "Delta", logo: "🇺🇸", credibility: 85 },
    { name: "United Airlines", logo: "🇺🇸", credibility: 83 },
    { name: "Turkish Airlines", logo: "🇹🇷", credibility: 86 },
    { name: "Etihad Airways", logo: "🇦🇪", credibility: 91 },
  ];

  const seed = hashCode(`${from}-${to}-${date}`);
  const rng = seededRandom(seed);

  const basePrice = getBasePrice(from, to);
  const numOptions = 3 + Math.floor(rng() * 3);
  const options: FlightOption[] = [];

  for (let i = 0; i < numOptions; i++) {
    const airline = airlines[Math.floor(rng() * airlines.length)];
    const stops = Math.floor(rng() * 3);
    const baseDuration = getBaseDuration(from, to);
    const totalDuration = baseDuration + stops * (90 + Math.floor(rng() * 120));
    const priceMultiplier = 0.8 + rng() * 0.6 + (stops === 0 ? 0.3 : stops === 1 ? 0.1 : -0.1);
    const price = Math.round(basePrice * priceMultiplier);
    const depHour = 6 + Math.floor(rng() * 16);
    const depMin = Math.floor(rng() * 4) * 15;

    const stopCities = [];
    const transitCities = ["Dubai", "Istanbul", "Singapore", "Tokyo", "Hong Kong", "Doha", "Amsterdam", "Frankfurt"];
    for (let j = 0; j < stops; j++) {
      stopCities.push(transitCities[Math.floor(rng() * transitCities.length)]);
    }

    const earlierSaving = Math.round(price * (0.05 + rng() * 0.15));
    const laterIncrease = Math.round(price * (0.03 + rng() * 0.1));

    options.push({
      airline: airline.name,
      airlineLogo: airline.logo,
      flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${100 + Math.floor(rng() * 900)}`,
      departureTime: `${depHour.toString().padStart(2, "0")}:${depMin.toString().padStart(2, "0")}`,
      arrivalTime: calculateArrival(depHour, depMin, totalDuration),
      duration: formatDuration(totalDuration),
      stops,
      stopCities,
      price,
      currency: "USD",
      bookingUrl: `https://www.skyscanner.co.kr/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/${date.replace(/-/g, "")}/?adultsv2=1`,
      credibilityScore: airline.credibility,
      priceTrend: {
        earlierPrice: price - earlierSaving,
        laterPrice: price + laterIncrease,
        message:
          earlierSaving > laterIncrease
            ? `Book 1 day earlier to save $${earlierSaving}`
            : `Prices may increase by $${laterIncrease} if delayed`,
      },
    });
  }

  const pris = priorities.length > 0 ? priorities : ["rating" as FlightPriority];

  return options.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    const w = 1 / pris.length;

    for (const p of pris) {
      switch (p) {
        case "duration":
          scoreA += (1 - parseDuration(a.duration) / 2000) * w;
          scoreB += (1 - parseDuration(b.duration) / 2000) * w;
          break;
        case "rating":
          scoreA += (a.credibilityScore / 100) * w;
          scoreB += (b.credibilityScore / 100) * w;
          break;
        case "stops":
          scoreA += (1 - a.stops / 3) * w;
          scoreB += (1 - b.stops / 3) * w;
          break;
        case "price":
          scoreA += (1 - a.price / 2000) * w;
          scoreB += (1 - b.price / 2000) * w;
          break;
      }
    }
    return scoreB - scoreA;
  });
}

function parseDuration(dur: string): number {
  const match = dur.match(/(\d+)h\s*(\d+)m/);
  return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 9999;
}

function getBasePrice(from: string, to: string): number {
  const routes: Record<string, number> = {
    "ICN-DXB": 650, "ICN-MIA": 950, "ICN-JFK": 850, "ICN-LAX": 750,
    "ICN-LHR": 700, "ICN-CDG": 720, "ICN-NRT": 200, "ICN-SIN": 400,
    "ICN-BKK": 350, "ICN-HKG": 300, "ICN-SFO": 780, "ICN-FRA": 680,
    "ICN-CGK": 420, "ICN-DPS": 450, "ICN-TPE": 220,
    "DXB-MIA": 800, "DXB-JFK": 750, "DXB-LHR": 400, "DXB-SIN": 450,
    "MIA-JFK": 200, "MIA-LAX": 250, "JFK-LHR": 450, "JFK-CDG": 480,
    "LHR-CDG": 120, "SIN-BKK": 150, "SIN-HKG": 200,
    "NRT-LAX": 700, "NRT-SFO": 680, "NRT-SIN": 400,
    "CGK-SIN": 150, "CGK-BKK": 250, "CGK-DXB": 550, "CGK-NRT": 400,
    "DPS-SIN": 200, "DPS-CGK": 80, "TPE-NRT": 220, "TPE-HKG": 180,
  };
  const key = `${from}-${to}`;
  const reverseKey = `${to}-${from}`;
  return routes[key] || routes[reverseKey] || 500 + Math.abs(hashCode(key)) % 800;
}

function getBaseDuration(from: string, to: string): number {
  const routes: Record<string, number> = {
    "ICN-DXB": 570, "ICN-MIA": 1080, "ICN-JFK": 840, "ICN-LAX": 690,
    "ICN-LHR": 720, "ICN-CDG": 740, "ICN-NRT": 150, "ICN-SIN": 390,
    "ICN-BKK": 330, "ICN-HKG": 240, "ICN-SFO": 660, "ICN-FRA": 690,
    "ICN-CGK": 420, "ICN-DPS": 450, "ICN-TPE": 160,
    "DXB-MIA": 960, "DXB-JFK": 870, "DXB-LHR": 450, "DXB-SIN": 420,
    "MIA-JFK": 180, "MIA-LAX": 330, "JFK-LHR": 420, "JFK-CDG": 450,
    "CGK-SIN": 120, "CGK-BKK": 210, "CGK-DXB": 510, "CGK-NRT": 420,
    "DPS-SIN": 160, "TPE-NRT": 180, "TPE-HKG": 120,
  };
  const key = `${from}-${to}`;
  const reverseKey = `${to}-${from}`;
  return routes[key] || routes[reverseKey] || 300 + Math.abs(hashCode(key)) % 600;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

function seededRandom(seed: number) {
  let s = Math.abs(seed) || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return Math.abs(s) / 2147483647;
  };
}

function calculateArrival(depHour: number, depMin: number, durationMin: number): string {
  const totalMin = depHour * 60 + depMin + durationMin;
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const nextDay = totalMin >= 1440 ? " +1d" : "";
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${nextDay}`;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}
