# How Much Is It? — Business Trip Cost Analyst

A SaaS platform that calculates the full cost of multi-destination business trips. Get a detailed receipt-style breakdown before you go.

## What It Does

Enter your trip destinations and dates, and get:

- **Flight Options** — Ranked by airline reliability, duration, stops, and price (with Skyscanner links)
- **Transportation Costs** — Uber, subway, taxi estimates per destination based on local transit research
- **Food & Dining** — Budget to fine dining meal cost averages per city
- **Hotel Suggestions** — 3 to 5-star options with per-night pricing and booking links
- **Full Receipt** — Total trip cost in USD + local currencies
- **Day-by-Day Itinerary** — Suggested schedule with timezone comparison to home

## Example

```
Seoul → Dubai (7 nights) → Miami (7 nights) → Seoul

Flights:          $2,400
Hotels:           $2,380
Transportation:     $680
Food & Dining:    $1,120
─────────────────────────
Estimated Total:  $6,580
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Design**: White/gray glassmorphism with floating UI elements

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output goes to `./out/` for deployment.

## Supported Destinations

Seoul, Tokyo, Dubai, Miami, New York, London, Paris, Singapore, Hong Kong, Bangkok, San Francisco, and more. Default cost estimates are provided for unlisted cities.

## License

MIT
