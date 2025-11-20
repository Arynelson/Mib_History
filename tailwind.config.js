/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'historia': {
          'dark': '#000706',
          'teal-dark': '#00272D',
          'teal': '#134647',
          'turquoise': '#0C7E7E',
          'sand': '#BFAC8B',
        }
      }
    },
  },
  plugins: [],
};
