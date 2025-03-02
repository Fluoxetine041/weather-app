import React, { useState, useEffect } from "react";

function DarkModeToggle() {
  // 從 localStorage 讀取初始深色模式狀態
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  // 當 darkMode 改變時，更新 localStorage 並調整 body 樣式
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button 
      className="bg-gray-700 text-white px-4 py-2 rounded" 
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkModeToggle;