"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gray-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gray-50/60 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs text-gray-500 mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              Business Trip Planning Made Simple
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 animate-slide-up">
              How Much
              <br />
              <span className="text-gray-400">Is It?</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Get a detailed cost breakdown for your entire business trip.
              Flights, hotels, transportation, meals — all researched and
              calculated for you in one receipt.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/planner" className="glass-button-primary !px-8 !py-4 !text-base !rounded-2xl">
                Start Planning Your Trip
              </Link>
              <a href="#how-it-works" className="glass-button !px-8 !py-4 !text-base !rounded-2xl">
                How It Works
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Everything You Need to Know
              </h2>
              <p className="text-gray-400 text-sm">
                Before you go, know exactly how much it&apos;ll cost
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "✈️",
                  title: "Flight Analysis",
                  description:
                    "Best flight options ranked by reliability, duration, transfers, and price. With Skyscanner integration.",
                },
                {
                  icon: "🚗",
                  title: "Transportation",
                  description:
                    "Uber, subway, taxi — researched per destination with daily cost estimates.",
                },
                {
                  icon: "🍽️",
                  title: "Food & Dining",
                  description:
                    "From street food to client dinners. Average meal costs by destination with daily breakdowns.",
                },
                {
                  icon: "🏨",
                  title: "Hotels",
                  description:
                    "3 to 5-star suggestions with real booking links. Per-night and total stay costs.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="glass-card p-6 group"
                >
                  <div className="text-2xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Three Simple Steps
              </h2>
              <p className="text-gray-400 text-sm">
                Plan your multi-destination business trip in minutes
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Enter Your Trip Details",
                  description:
                    "Set your starting city, add destinations (as many as you need), set dates, and choose your preferences. Add a return home leg when you're done.",
                },
                {
                  step: "02",
                  title: "Get Your Cost Breakdown",
                  description:
                    "Receive a detailed receipt with flight options, transportation estimates, food costs, and hotel suggestions for every destination. All with real booking links.",
                },
                {
                  step: "03",
                  title: "Review Your Itinerary",
                  description:
                    "Get a day-by-day schedule with timezone comparisons to home. Know exactly when you land, when you eat, and when your body thinks it's 3am.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-6 flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Receipt */}
        <section className="py-20 px-6 bg-gray-50/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your Trip, One Receipt
            </h2>
            <p className="text-gray-400 text-sm mb-12">
              Example: Seoul → Dubai → Miami → Seoul
            </p>

            <div className="glass-card p-8 text-left">
              <div className="space-y-4 mb-6">
                {[
                  { label: "Seoul → Dubai", sub: "7 nights · Korean Air", cost: "$650" },
                  { label: "Dubai → Miami", sub: "7 nights · Emirates", cost: "$800" },
                  { label: "Miami → Seoul", sub: "Return · Delta", cost: "$950" },
                ].map((leg, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{leg.label}</div>
                      <div className="text-xs text-gray-400">{leg.sub}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{leg.cost}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 py-4 border-y border-dashed border-gray-200">
                {[
                  { label: "Flights (3)", cost: "$2,400" },
                  { label: "Hotels (14 nights)", cost: "$2,380" },
                  { label: "Transportation", cost: "$680" },
                  { label: "Food & Dining", cost: "$1,120" },
                ].map((line, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{line.label}</span>
                    <span className="text-gray-600">{line.cost}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Estimated Total</span>
                <span className="text-2xl font-bold text-gray-900">$6,580</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Plan?
            </h2>
            <p className="text-gray-400 mb-8">
              Stop guessing. Start knowing exactly how much your business trip will cost.
            </p>
            <Link
              href="/planner"
              className="glass-button-primary !px-10 !py-4 !text-base !rounded-2xl inline-block"
            >
              Plan My Business Trip
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-400">
            <span>How Much Is It? — Business Trip Cost Analyst</span>
            <span>Built for business travelers</span>
          </div>
        </footer>
      </main>
    </>
  );
}
