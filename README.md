# PLANO — Business Trip Cost Analyst

> **[Launch App →](https://njlee269.github.io/business-trip-cost-analyst/)**

A SaaS platform that calculates the full cost of multi-destination business trips. Get a detailed receipt-style breakdown before you go.

## What It Does

Enter your trip destinations and dates, and get:

- **Flight Options** — Ranked by your priorities (speed, airline trust, stops, price). Multi-priority blending supported. Links to Skyscanner, Google Flights & Secret Flying
- **Transportation Costs** — Airport transfers (default), plus toggleable Uber, subway, taxi estimates per destination
- **Food & Dining** — Select meal tiers (budget, mid-range, fine dining) and meals per day — all adjustable after calculation
- **Hotel Suggestions** — 3 to 5-star clickable options with Agoda booking links (dates pre-filled)
- **Full Receipt** — Dynamic totals that update as you select flights, hotels, food tiers, and transport options. USD + local currencies
- **Schedule** — Arrival & departure day details with timezone comparison; work days summarized
- **Round Trip Toggle** — One switch to auto-add return leg
- **Save & Compare** — Save trip plans to compare costs across multiple trips

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
- **Design**: White/gray glassmorphism with blue accents

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Static output goes to `./out/`. Deployed via GitHub Pages (`gh-pages` branch).

## Supported Destinations

Seoul, Tokyo, Dubai, Miami, New York, London, Paris, Singapore, Hong Kong, Bangkok, San Francisco, Jakarta, Bali, Taipei, and more. Default cost estimates are provided for unlisted cities.

## License

NJ
