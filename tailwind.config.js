/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        futurium: ["Futurium", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0 8px 8px rgba(0, 0, 0, 0.9)",
        "4xl": [
          "0 4px 8px rgba(0, 0, 0, 0.4)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-custom": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#FFFFFF #85b4ff",
          "z-index": "30",

          /* Chrome, Edge, and Safari */
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            "border-radius": "10px",
          },

          "&::-webkit-scrollbar-thumb": {
            "background-color": "#FFFFFF",
            "border-radius": "10px",
            "border-style": "solid",
            "border-width": "2px",
            "border-color": "#ffffff",
          },

          "&::-webkit-scrollbar-thumb:hover": {
            background: "#5999ff",
          },
        },
      });
    }),
  ],
};
