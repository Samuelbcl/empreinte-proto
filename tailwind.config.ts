import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  "#FBF8F2",
          100: "#F5EFE6",
          200: "#EDE3D1",
          300: "#E0D2B6",
        },
        gold: {
          400: "#D4B97A",
          500: "#C9A961",
          600: "#B8924A",
          700: "#A88947",
          800: "#8A6F38",
        },
        ink: {
          900: "#0F1729",
          800: "#1A1A2E",
          700: "#2A2A3E",
        },
        warm: {
          400: "#9C8F7F",
          500: "#7A6F60",
          600: "#5E5448",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        mobile: "440px",
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(15, 23, 41, 0.15)",
        gold: "0 0 24px -4px rgba(201, 169, 97, 0.4)",
      },
      letterSpacing: {
        wider2: "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
