const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    listStyleType: {
      square: "square",
      circle: "circle",
      decimal: "decimal",
      disc: "disc",
    },
    extend: {
      colors: {
        primary: "#0E468C",
        secondary: "#E0EFF0",
        accent: "#D83415",
        background: "#F1EDE8",

        // Light colors
        "primary-light": "#F7F8FC",
        "secondary-light": "#FFFFFF",
        "ternary-light": "#f6f7f8",

        // Dark colors
        "primary-dark": "#0D2438",
        "secondary-dark": "#102D44",
        "ternary-dark": "#1E3851",

        // Extended v3 color
        gray: colors.neutral,
      },
      container: {
        padding: {
          DEFAULT: "0.5rem",
          sm: "0.5rem",
          lg: "4rem",
          xl: "8rem",
          "2xl": "8rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
