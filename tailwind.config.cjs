/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{html,jsx,tsx}", "src/.{html,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Bungee: ["Bungee"],
      },
      colors: {
        primary: "#fff",
        secondary: "#282c34",
        "bg-secondary": "#282535",
        "light-black": "#181717",
        "btn-blue": "#38388f",
        "light-grey": "#3a3a3a",
      },
    },
  },
  plugins: [],
};
