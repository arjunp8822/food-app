/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#073b4c",
        secondary: "#6d6875",
        protein: "#ef476f",
        carbs: "#06d6a0",
        fat: "#ffd166",
        calories: "#118ab2",
        card: "#e7ecef",
      },
    },
  },
  plugins: [],
};
