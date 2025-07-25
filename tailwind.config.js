/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A47FF',
        secondary: '#5B5FE3',
        accent: '#FF6B35',
        background: '#F4F3FF',
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", 'sans-serif'],
        body: ["Inter", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

