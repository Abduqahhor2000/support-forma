/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'color-brand': 'rgba(0, 39, 105, 1)',
        'gradient-color-1': "#069E81",
        'gradient-color-2': "#29DEBB",
        "input-border": "rgba(227, 227, 227, 1)",
        "input-focus": "rgba(51, 137, 233, 1)",
        "input-succes": "rgba(39, 174, 96, 1)",
        "input-error": "rgba(216, 59, 59, 1)",
        "placeholder": "rgba(0, 30, 80, 0.5)",
        "resume": "#505470",
      },
      boxShadow: {
        "cardJob": "0px 4px 20px rgba(0, 0, 0, 0.2)",
      }
    },
  },
  plugins: [],
}
