import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          50: "#fafbfc",
          100: "#f4f5f7",
          200: "#e8eaed",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.05)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.1)",
        float: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        "float-hover": "0 20px 60px -15px rgba(0, 0, 0, 0.15)",
        btn: "0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "btn-hover": "0 8px 25px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.06)",
      },
      backdropBlur: {
        glass: "20px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
