/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#06151D",
        darkOrange: "#2F1A0A",
        primary: "#0081C9",
        secondary: "#EB8535",
      },
    },
  },
  plugins: [],
};
