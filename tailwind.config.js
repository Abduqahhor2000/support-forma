/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      msm: "320px",
      lsm: "380px",
      xsm: "480px",
      sm: "640px",
      md: "768px",
      mds: "920px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        "color-brand": "rgba(0, 39, 105, 1)",
        "gradient-color-1": "#069E81",
        "gradient-color-2": "#29DEBB",
        "input-border": "rgba(227, 227, 227, 1)",
        "input-focus": "rgba(51, 137, 233, 1)",
        "input-succes": "rgba(39, 174, 96, 1)",
        "input-error": "rgba(216, 59, 59, 1)",
        placeholder: "rgba(0, 30, 80, 0.5)",
        resume: "#505470",
        "form-bg": "#FBFBFB",
        "form-border": "#E3E3E3",
        "border-active": "#29A990",
        "main-text": "#001E50",
        blacker: {
          "04": "rgba(0, 0, 0, 0.4)",
        },
      },
      boxShadow: {
        cardJob: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
