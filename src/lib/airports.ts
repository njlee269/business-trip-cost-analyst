import { Airport } from "./types";

export const airports: Airport[] = [
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { code: "GMP", name: "Gimpo International", city: "Seoul", country: "South Korea" },
  { code: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { code: "HND", name: "Haneda", city: "Tokyo", country: "Japan" },
  { code: "KIX", name: "Kansai International", city: "Osaka", country: "Japan" },
  { code: "PEK", name: "Beijing Capital", city: "Beijing", country: "China" },
  { code: "PVG", name: "Pudong International", city: "Shanghai", country: "China" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong" },
  { code: "SIN", name: "Changi", city: "Singapore", country: "Singapore" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { code: "MNL", name: "Ninoy Aquino International", city: "Manila", country: "Philippines" },
  { code: "SGN", name: "Tan Son Nhat", city: "Ho Chi Minh City", country: "Vietnam" },
  { code: "HAN", name: "Noi Bai International", city: "Hanoi", country: "Vietnam" },
  { code: "DEL", name: "Indira Gandhi International", city: "New Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj", city: "Mumbai", country: "India" },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "UAE" },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { code: "RUH", name: "King Khalid International", city: "Riyadh", country: "Saudi Arabia" },
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
  { code: "EWR", name: "Newark Liberty International", city: "New York", country: "USA" },
  { code: "LGA", name: "LaGuardia", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "USA" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", country: "USA" },
  { code: "MIA", name: "Miami International", city: "Miami", country: "USA" },
  { code: "ATL", name: "Hartsfield-Jackson", city: "Atlanta", country: "USA" },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "USA" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "USA" },
  { code: "BOS", name: "Logan International", city: "Boston", country: "USA" },
  { code: "IAD", name: "Dulles International", city: "Washington D.C.", country: "USA" },
  { code: "DEN", name: "Denver International", city: "Denver", country: "USA" },
  { code: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "USA" },
  { code: "HNL", name: "Daniel K. Inouye International", city: "Honolulu", country: "USA" },
  { code: "LHR", name: "Heathrow", city: "London", country: "UK" },
  { code: "LGW", name: "Gatwick", city: "London", country: "UK" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany" },
  { code: "MUC", name: "Munich", city: "Munich", country: "Germany" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino", city: "Rome", country: "Italy" },
  { code: "MXP", name: "Malpensa", city: "Milan", country: "Italy" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas", city: "Madrid", country: "Spain" },
  { code: "BCN", name: "Josep Tarradellas Barcelona–El Prat", city: "Barcelona", country: "Spain" },
  { code: "ZRH", name: "Zürich", city: "Zurich", country: "Switzerland" },
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "Turkey" },
  { code: "SYD", name: "Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "MEL", name: "Tullamarine", city: "Melbourne", country: "Australia" },
  { code: "AKL", name: "Auckland", city: "Auckland", country: "New Zealand" },
  { code: "GRU", name: "Guarulhos", city: "São Paulo", country: "Brazil" },
  { code: "MEX", name: "Benito Juárez International", city: "Mexico City", country: "Mexico" },
  { code: "CUN", name: "Cancún International", city: "Cancún", country: "Mexico" },
  { code: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg", country: "South Africa" },
  { code: "CAI", name: "Cairo International", city: "Cairo", country: "Egypt" },
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya" },
];

export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase();
  return airports
    .filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q)
    )
    .slice(0, 8);
}
