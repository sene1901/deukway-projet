/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0E7C5A", 
          light: "#12A374",
          dark: "#0A5C42",
        },
        accent: "#F5A623", 
        ink: "#101418",
        muted: "#6B7280",
        surface: "#F7F8F7",
        border: "#E6E8E6",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
