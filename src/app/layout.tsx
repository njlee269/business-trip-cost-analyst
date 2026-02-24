import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "How Much Is It? — Business Trip Cost Analyst",
  description:
    "Plan your business trip with detailed cost breakdowns for flights, hotels, transportation, and meals. Get real-time estimates and smart itineraries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
