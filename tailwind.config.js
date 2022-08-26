/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      "2xl": { min: "1536px" },
      "<md": { max: "767.8px" },
      "<lg": { max: "1023.8px" },
      "<xl": { max: "1279.8px" },
      "<2xl": { max: "1535.8px" },
    },
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      const blockQuote = {
        ".blockquote": {
          backgroundColor: "rgb(229, 231, 235)",
          borderLeft: "8px solid rgb(55, 65, 81)",
          padding: "1rem",
        },
      };
      addComponents(blockQuote);
    }),
  ],
};
