/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        baroworks: {
          bg: "#0D0D0E",        // Deep Charcoal / Pitch Black
          card: "#161618",      // Matte Dark Graphite
          border: "#26262A",    // Subtle Muted Border
          yellow: "#FACC15",    // Vibrant Electric Yellow
          amber: "#EAB308",     // Amber Accent
          text: "#FAFAFA",      // Crisp Warm White
          muted: "#A1A1AA",     // Muted Text
        },
        linen: {
          50: "#FDFCFB",
          100: "#FBF9F5", // Primary Background (Warm Linen / Off-White)
          200: "#F7F4EE",
          300: "#E8E3D9", // Subtle Warm Border
          400: "#D3CBBF",
          500: "#B8AC9A",
          600: "#8C6D46", // Rich Caramel Accent
          700: "#785C38",
          800: "#4D3B26",
          900: "#1A1917", // Deep Espresso
        },
        caramel: {
          DEFAULT: "#8C6D46",
          light: "#C4A47C", // Ochre
          dark: "#785C38",
          tint: "#F3EDE2",
        },
        espresso: {
          DEFAULT: "#1A1917",
          primary: "#1A1917",
          muted: "#6B665E",
          subtle: "#8C8479",
        },
        defender: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
