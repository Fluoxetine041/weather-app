import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LocationContext } from "../context/LocationContext"; // 共享 `location`
import { LanguageContext } from "../context/LanguageContext"; // 共享 `language`

function Header() {
  const { location, setLocation } = useContext(LocationContext); // 獲取 & 設定 `location`
  const { language, toggleLanguage } = useContext(LanguageContext); // 獲取 & 切換 `language`

  // 讀取 LocalStorage，決定預設模式
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    // 切換深色模式時，更新 `document.body` 的 class
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // 儲存使用者偏好到 LocalStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header className="w-full p-4 bg-gray-900 text-gray-300 flex justify-between items-center dark:bg-[#121212]">
      {/* 左側：導航選單 */}
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">{language === "zh" ? "主頁" : "Home"}</Link>
        <Link to="/compare" className="hover:underline">{language === "zh" ? "常用城市" : "Saved Cities"}</Link>
        <Link to="/forecast" className="hover:underline">{language === "zh" ? "五日預報" : "5-Day Forecast"}</Link>
      </nav>

      <div className="flex gap-4">
        {/* 城市搜尋框 */}
        <input
          type="text"
          className="p-2 border rounded text-black dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          placeholder={language === "zh" ? "輸入城市名稱" : "Enter city name"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* 深色模式切換按鈕 */}
        <button className="bg-gray-700 text-white px-4 py-2 rounded dark:bg-gray-500 dark:hover:bg-gray-400" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* 語言切換按鈕 */}
        <button className="bg-gray-700 text-white px-4 py-2 rounded dark:bg-gray-500 dark:hover:bg-gray-400" onClick={toggleLanguage}>
          {language === "zh" ? "🇹🇼 切換英文" : "🇬🇧 Switch to Chinese"}
        </button>
      </div>
    </header>
  );
}

export default Header;