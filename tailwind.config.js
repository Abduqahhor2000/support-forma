/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'color-brand': 'rgba(0, 39, 105, 1)',
        'gradient-color-1': "#069E81",
        'gradient-color-2': "#29DEBB",
      },
    },
  },
  plugins: [],
}
