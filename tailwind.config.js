/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ------------------------------------ Backgrounds */
        "dark-bg": "var(--dark-bg)",
        "card-bg": "var(--card-bg)",
        "card-img-bg": "var(--card-img-bg)",
        "input-bg": "var(--input-bg)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        /* ------------------------------------- Text */
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "text-tertiary": "rgb(var(--text-tertiary-rgb) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-rgb) / <alpha-value>)",
        "text-light": "rgb(var(--text-light-rgb) / <alpha-value>)",
        "text-error": "rgb(var(--text-error-rgb) / <alpha-value>)",
        /* ------------------------------------- Borders */
        "card-border": "rgb(var(--card-border-rgb) / <alpha-value>)",
        "input-border": "rgb(var(--input-border-rgb) / <alpha-value>)",
        "border-primary": "rgb(var(--border-primary-rgb) / <alpha-value>)",
        /* ------------------------------------- Accents */
        "teal-accent": "rgb(var(--teal-rgb) / <alpha-value>)",
        "orange-accent": "rgb(var(--orange-rgb) / <alpha-value>)",
        "input-placeholder": "var(--input-placeholder)",
      },
    },
  },
  plugins: [],
};
