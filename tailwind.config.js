/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'lima-primary': '#B8F500',
        'lima-light': '#B8F5A0',
        'lima-dark': '#003C00',
      },
    },
  },
  plugins: [],
}
