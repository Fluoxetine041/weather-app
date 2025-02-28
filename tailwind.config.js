/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ 啟用 Tailwind 的深色模式（使用 .dark class 切換）
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#121212", // 深色模式的背景顏色
        darkText: "#ffffff", // 深色模式的文字顏色
        lightBg: "#f8f9fa", // 淺色模式的背景顏色
        lightText: "#212529", // 淺色模式的文字顏色
      },
    },
  },
  plugins: [],
};