/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // 320px 以上
      sm: "320px",
      // 768px 以上
      md: "768px",
      // 1024px 以上
      lg: "1024px",
      // 1440px 以上
      xl: "1440px",
    },
    extend: {
      // 你原先的其他設定...
    },
  },
  plugins: [],
};