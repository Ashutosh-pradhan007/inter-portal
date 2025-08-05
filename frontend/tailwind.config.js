// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphic: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff"
      },
      colors: {
        // Optional: add your own custom palette
        primary: {
          light: "#A78BFA",
          DEFAULT: "#7C3AED",
          dark: "#5B21B6"
        },
        accent: {
          light: "#FDE68A",
          DEFAULT: "#FBBF24",
          dark: "#B45309"
        }
      }
    }
  },
  plugins: []
};
