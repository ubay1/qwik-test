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
  plugins: [],
};
