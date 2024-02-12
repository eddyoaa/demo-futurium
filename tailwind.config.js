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
    plugin(function ({ addVariant }) {
      addVariant(
        "scrollBarSupport",
        "@supports not selector(::-webkit-scrollbar)"
      );
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".noSelect": {
          "-webkit-tap-highlight-color": "transparent",
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none",
        },
        ".noSelect:focus": {
          outline: "none !important",
        },
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
        ".scrollbar-custom-support": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#FFFFFF transparent",
          "z-index": "30",
        },
        ".scrollbar-custom": {
          /* Chrome, Edge, and Safari */
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
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
        ".scrollbar-custom-black-support": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#000000 transparent",
          "z-index": "30",
        },
        ".scrollbar-custom-black": {
          /* Chrome, Edge, and Safari */
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            "border-radius": "10px",
          },

          "&::-webkit-scrollbar-thumb": {
            "background-color": "#000000",
            "border-radius": "10px",
            "border-style": "solid",
            "border-width": "2px",
            "border-color": "#000000",
          },

          "&::-webkit-scrollbar-thumb:hover": {
            background: "#5999ff",
          },
        },
      });
    }),
  ],
};
