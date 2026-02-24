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
  if (homeHour < 0) {
    homeHour += 24;
    dayShift = " (prev day)";
  } else if (homeHour >= 24) {
    homeHour -= 24;
    dayShift = " (next day)";
  }
  return `${homeHour.toString().padStart(2, "0")}:${localMin.toString().padStart(2, "0")}${dayShift}`;
}

function generateSchedule(summary: TripCostSummary): DaySchedule[] {
  const schedules: DaySchedule[] = [];

  for (const dest of summary.destinations) {
    const offsetDiff = dest.timezoneOffset - dest.homeTimezoneOffset;
    const arrDate = new Date(dest.arrivalDate);
    const depDate = new Date(dest.departureDate);

    for (let d = new Date(arrDate); d <= depDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const isArrivalDay = dateStr === dest.arrivalDate;
      const isDepartureDay = dateStr === dest.departureDate;
      const dayNum = Math.floor((d.getTime() - arrDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const items: ScheduleItem[] = [];

      if (isArrivalDay) {
        const arrHour = parseInt(dest.flights[0]?.arrivalTime?.split(":")[0] || "19");
        const arrMin = parseInt(dest.flights[0]?.arrivalTime?.split(":")[1]?.substring(0, 2) || "00");

        items.push({
          time: `${arrHour.toString().padStart(2, "0")}:${arrMin.toString().padStart(2, "0")}`,
          homeTime: formatHomeTime(arrHour, arrMin, offsetDiff),
          activity: `Arrive at ${dest.destination.city} (${dest.destination.code})`,
          icon: "✈️",
        });
        items.push({
          time: `${(arrHour + 1).toString().padStart(2, "0")}:${arrMin.toString().padStart(2, "0")}`,
          homeTime: formatHomeTime(arrHour + 1, arrMin, offsetDiff),
          activity: "Immigration & baggage claim",
          icon: "🛂",
        });
        items.push({
          time: `${(arrHour + 1).toString().padStart(2, "0")}:30`,
          homeTime: formatHomeTime(arrHour + 1, 30, offsetDiff),
          activity: `Uber/taxi to hotel (~${getCityTransitTime(dest.destination.city)} min)`,
          icon: "🚗",
        });
        items.push({
          time: `${Math.min(arrHour + 2, 23).toString().padStart(2, "0")}:30`,
          homeTime: formatHomeTime(Math.min(arrHour + 2, 23), 30, offsetDiff),
          activity: "Check in to hotel, settle in",
          icon: "🏨",
        });
        if (arrHour < 20) {
          items.push({
            time: `${Math.min(arrHour + 3, 22).toString().padStart(2, "0")}:00`,
            homeTime: formatHomeTime(Math.min(arrHour + 3, 22), 0, offsetDiff),
            activity: "Dinner (local cuisine)",
            icon: "🍽️",
          });
        }
        items.push({
          time: "23:00",
          homeTime: formatHomeTime(23, 0, offsetDiff),
          activity: "Rest & adjust to timezone",
          icon: "😴",
        });
      } else if (isDepartureDay) {
        items.push(
          { time: "07:00", homeTime: formatHomeTime(7, 0, offsetDiff), activity: "Wake up, pack", icon: "⏰" },
          { time: "08:00", homeTime: formatHomeTime(8, 0, offsetDiff), activity: "Breakfast", icon: "🍽️" },
          { time: "09:00", homeTime: formatHomeTime(9, 0, offsetDiff), activity: "Hotel checkout", icon: "🏨" },
          { time: "09:30", homeTime: formatHomeTime(9, 30, offsetDiff), activity: "Uber/taxi to airport", icon: "🚗" },
          { time: "10:30", homeTime: formatHomeTime(10, 30, offsetDiff), activity: "Arrive at airport, check-in", icon: "✈️" },
        );
        if (dest.flights[0]) {
          items.push({
            time: dest.flights[0].departureTime,
            homeTime: formatHomeTime(
              parseInt(dest.flights[0].departureTime.split(":")[0]),
              parseInt(dest.flights[0].departureTime.split(":")[1]),
              offsetDiff
            ),
            activity: `Depart ${dest.destination.city} → ${dest.flights[0].airline}`,
            icon: "🛫",
          });
        }
      } else {
        items.push(
          { time: "07:00", homeTime: formatHomeTime(7, 0, offsetDiff), activity: "Wake up", icon: "⏰" },
          { time: "07:30", homeTime: formatHomeTime(7, 30, offsetDiff), activity: "Breakfast at hotel / nearby", icon: "🍽️" },
          { time: "09:00", homeTime: formatHomeTime(9, 0, offsetDiff), activity: "Business meetings / work", icon: "💼" },
          { time: "12:30", homeTime: formatHomeTime(12, 30, offsetDiff), activity: "Lunch with colleagues/clients", icon: "🍽️" },
          { time: "14:00", homeTime: formatHomeTime(14, 0, offsetDiff), activity: "Afternoon meetings / work", icon: "💼" },
          { time: "18:00", homeTime: formatHomeTime(18, 0, offsetDiff), activity: "Wrap up, head to hotel", icon: "🚗" },
          { time: "19:30", homeTime: formatHomeTime(19, 30, offsetDiff), activity: "Dinner (restaurant)", icon: "🍽️" },
          { time: "21:00", homeTime: formatHomeTime(21, 0, offsetDiff), activity: "Free time / rest", icon: "😌" },
          { time: "23:00", homeTime: formatHomeTime(23, 0, offsetDiff), activity: "Sleep", icon: "😴" },
        );
      }

      schedules.push({
        date: dateStr,
        dayLabel: `Day ${schedules.length + 1}${isArrivalDay ? " (Arrival)" : isDepartureDay ? " (Departure)" : ""}`,
        destination: dest.destination.city,
        items,
      });
    }
  }

  return schedules;
}

function getCityTransitTime(city: string): number {
  const times: Record<string, number> = {
    Dubai: 35, Miami: 30, "New York": 55, London: 50, Tokyo: 60,
    Singapore: 25, Seoul: 50, "Hong Kong": 30, Paris: 40,
    "San Francisco": 30, Bangkok: 35,
  };
  return times[city] || 35;
}

export default function Itinerary({ summary }: ItineraryProps) {
  const schedule = generateSchedule(summary);

  if (schedule.length === 0) return null;

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Suggested Itinerary</h3>
      <p className="text-xs text-gray-400 mb-6">
        Daily schedule with local time and home time comparison
      </p>

      <div className="space-y-6">
        {schedule.map((day, di) => (
          <div key={di} className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                {di + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{day.dayLabel}</div>
                <div className="text-[10px] text-gray-400">
                  {day.date} · {day.destination}
                </div>
              </div>
            </div>

            <div className="ml-3.5 border-l-2 border-gray-100 pl-6 space-y-0">
              {day.items.map((item, ii) => (
                <div key={ii} className="relative pb-3 group">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-16">
                      <div className="text-xs font-mono font-medium text-gray-700">{item.time}</div>
                      <div className="text-[9px] font-mono text-gray-300">{item.homeTime} 🏠</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs text-gray-600">{item.activity}</span>
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
