"use client";

import { TripCostSummary } from "@/lib/types";

interface ItineraryProps {
  summary: TripCostSummary;
}

interface ScheduleItem {
  time: string;
  homeTime: string;
  activity: string;
  icon: string;
}

interface DaySchedule {
  date: string;
  dayLabel: string;
  destination: string;
  items: ScheduleItem[];
}

function formatHomeTime(localHour: number, localMin: number, offsetDiff: number): string {
  let homeHour = localHour - offsetDiff;
  let dayShift = "";
  if (homeHour < 0) { homeHour += 24; dayShift = " (prev day)"; }
  else if (homeHour >= 24) { homeHour -= 24; dayShift = " (next day)"; }
  return `${homeHour.toString().padStart(2, "0")}:${localMin.toString().padStart(2, "0")}${dayShift}`;
}

function getCityTransitTime(city: string): number {
  const times: Record<string, number> = {
    Dubai: 35, Miami: 30, "New York": 55, London: 50, Tokyo: 60,
    Singapore: 25, Seoul: 50, "Hong Kong": 30, Paris: 40,
    "San Francisco": 30, Bangkok: 35, Jakarta: 45, Bali: 20,
  };
  return times[city] || 35;
}

function generateSchedule(summary: TripCostSummary): DaySchedule[] {
  const schedules: DaySchedule[] = [];
  let globalDay = 1;

  for (const dest of summary.destinations) {
    const offsetDiff = dest.timezoneOffset - dest.homeTimezoneOffset;

    if (dest.isReturn) {
      const items: ScheduleItem[] = [];
      if (dest.flights[0]) {
        const depHour = parseInt(dest.flights[0].departureTime.split(":")[0]);
        const depMin = parseInt(dest.flights[0].departureTime.split(":")[1]);
        items.push({
          time: dest.flights[0].departureTime,
          homeTime: formatHomeTime(depHour, depMin, offsetDiff),
          activity: `Depart for ${dest.destination.city} — ${dest.flights[0].airline} (${dest.flights[0].duration})`,
          icon: "🛫",
        });
        items.push({
          time: dest.flights[0].arrivalTime,
          homeTime: formatHomeTime(parseInt(dest.flights[0].arrivalTime.split(":")[0]), parseInt(dest.flights[0].arrivalTime.split(":")[1]?.substring(0, 2) || "0"), offsetDiff),
          activity: `Arrive home — ${dest.destination.city}`,
          icon: "🏠",
        });
      }
      schedules.push({ date: dest.arrivalDate, dayLabel: `Day ${globalDay} — Return Home`, destination: dest.destination.city, items });
      globalDay++;
      continue;
    }

    const arrDate = new Date(dest.arrivalDate);
    const depDate = new Date(dest.departureDate);
    const totalDays = Math.max(1, Math.round((depDate.getTime() - arrDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    // Arrival day
    const arrItems: ScheduleItem[] = [];
    const arrHour = parseInt(dest.flights[0]?.arrivalTime?.split(":")[0] || "19");
    const arrMin = parseInt(dest.flights[0]?.arrivalTime?.split(":")[1]?.substring(0, 2) || "00");
    arrItems.push({ time: `${arrHour.toString().padStart(2, "0")}:${arrMin.toString().padStart(2, "0")}`, homeTime: formatHomeTime(arrHour, arrMin, offsetDiff), activity: `Arrive at ${dest.destination.city} (${dest.destination.code})`, icon: "✈️" });
    arrItems.push({ time: `${(arrHour + 1).toString().padStart(2, "0")}:${arrMin.toString().padStart(2, "0")}`, homeTime: formatHomeTime(arrHour + 1, arrMin, offsetDiff), activity: "Immigration & baggage claim", icon: "🛂" });
    arrItems.push({ time: `${(arrHour + 1).toString().padStart(2, "0")}:30`, homeTime: formatHomeTime(arrHour + 1, 30, offsetDiff), activity: `Uber/taxi to hotel (~${getCityTransitTime(dest.destination.city)} min)`, icon: "🚗" });
    arrItems.push({ time: `${Math.min(arrHour + 2, 23).toString().padStart(2, "0")}:30`, homeTime: formatHomeTime(Math.min(arrHour + 2, 23), 30, offsetDiff), activity: "Check in to hotel, settle in", icon: "🏨" });
    if (arrHour < 20) {
      arrItems.push({ time: `${Math.min(arrHour + 3, 22).toString().padStart(2, "0")}:00`, homeTime: formatHomeTime(Math.min(arrHour + 3, 22), 0, offsetDiff), activity: "Dinner (local cuisine)", icon: "🍽️" });
    }
    arrItems.push({ time: "23:00", homeTime: formatHomeTime(23, 0, offsetDiff), activity: "Rest & adjust to timezone", icon: "😴" });

    schedules.push({
      date: dest.arrivalDate,
      dayLabel: `Day ${globalDay} — Arrival in ${dest.destination.city}`,
      destination: dest.destination.city,
      items: arrItems,
    });
    globalDay++;

    // Middle days — summarized as a single "work" block
    if (totalDays > 2) {
      schedules.push({
        date: "",
        dayLabel: `Day ${globalDay}–${globalDay + totalDays - 3} — Work in ${dest.destination.city}`,
        destination: dest.destination.city,
        items: [
          { time: "—", homeTime: "—", activity: `${totalDays - 2} day${totalDays > 3 ? "s" : ""} of business meetings & work`, icon: "💼" },
        ],
      });
      globalDay += totalDays - 2;
    }

    // Departure day
    const depItems: ScheduleItem[] = [
      { time: "07:00", homeTime: formatHomeTime(7, 0, offsetDiff), activity: "Wake up, pack", icon: "⏰" },
      { time: "08:00", homeTime: formatHomeTime(8, 0, offsetDiff), activity: "Breakfast", icon: "🍽️" },
      { time: "09:00", homeTime: formatHomeTime(9, 0, offsetDiff), activity: "Hotel checkout", icon: "🏨" },
      { time: "09:30", homeTime: formatHomeTime(9, 30, offsetDiff), activity: "Uber/taxi to airport", icon: "🚗" },
      { time: "10:30", homeTime: formatHomeTime(10, 30, offsetDiff), activity: "Arrive at airport, check-in", icon: "✈️" },
    ];
    if (dest.flights[0]) {
      depItems.push({
        time: dest.flights[0].departureTime,
        homeTime: formatHomeTime(parseInt(dest.flights[0].departureTime.split(":")[0]), parseInt(dest.flights[0].departureTime.split(":")[1]), offsetDiff),
        activity: `Depart ${dest.destination.city} → ${dest.flights[0].airline}`,
        icon: "🛫",
      });
    }
    if (totalDays > 1) {
      schedules.push({
        date: dest.departureDate,
        dayLabel: `Day ${globalDay} — Departure from ${dest.destination.city}`,
        destination: dest.destination.city,
        items: depItems,
      });
      globalDay++;
    }
  }

  return schedules;
}

export default function Itinerary({ summary }: ItineraryProps) {
  const schedule = generateSchedule(summary);
  if (schedule.length === 0) return null;

  return (
    <div className="glass-card p-4 sm:p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Schedule</h3>
      <p className="text-xs text-gray-400 mb-6">Arrival & departure days with timezone comparison — work days summarized</p>

      <div className="space-y-6">
        {schedule.map((day, di) => (
          <div key={di} className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{di + 1}</div>
              <div>
                <div className="text-sm font-medium text-gray-800">{day.dayLabel}</div>
                {day.date && <div className="text-[10px] text-gray-400">{day.date} · {day.destination}</div>}
              </div>
            </div>

            <div className="ml-3.5 border-l-2 border-gray-100 pl-6 space-y-0">
              {day.items.map((item, ii) => (
                <div key={ii} className="relative pb-3 group">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-14 sm:w-16">
                      <div className="text-[11px] sm:text-xs font-mono font-medium text-gray-700">{item.time}</div>
                      <div className="text-[8px] sm:text-[9px] font-mono text-gray-300">{item.homeTime} 🏠</div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="text-sm flex-shrink-0">{item.icon}</span>
                      <span className="text-[11px] sm:text-xs text-gray-600 break-words">{item.activity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
