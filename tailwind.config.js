// tailwind.config.js
const {heroui, colors} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@heroui/theme/dist/components/(chip|pagination).js"
],
  theme: {
    extend: {
      colors: {     
         'primary-green': '#619B7D',
        }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};