import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LocationContext } from "../context/LocationContext"; // 共享 location
import { LanguageContext } from "../context/LanguageContext"; // 共享 language

function Header() {
  const { location, setLocation, setCompareInput } = useContext(LocationContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    // 讀取 LocalStorage，決定預設模式
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        // 載入 LocalStorage 搜尋紀錄
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSearchHistory(history);

        // 深色模式切換
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    // 更新搜尋紀錄
    const saveSearchHistory = (city) => {
        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        history = [city, ...history.filter(c => c !== city)].slice(0, 5); // 限制最多 5 筆
        localStorage.setItem("searchHistory", JSON.stringify(history));
        setSearchHistory(history);
    };

    return (
        <header className="w-full p-4 bg-gray-900 text-gray-300 flex justify-between items-center dark:bg-[#121212]">
            {/* 導航選單 - 保持在同一行 */}
            <nav className="flex gap-4">
                <Link to="/" className="hover:underline">{language === "zh" ? "主頁" : "Home"}</Link>
                <Link to="/compare" className="hover:underline">{language === "zh" ? "常用城市" : "Saved Cities"}</Link>
                <Link to="/forecast" className="hover:underline">{language === "zh" ? "五日預報" : "5-Day Forecast"}</Link>
            </nav>

            {/* 城市搜尋框 */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className="p-2 border rounded text-black dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                    placeholder={language === "zh" ? "輸入城市名稱..." : "Enter city name..."}
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                        setCompareInput(e.target.value); // 🔥 同步 Compare.js 的輸入框
                    }}
                />
                <button
                    onClick={() => {
                        if (!location.trim()) return;
                        saveSearchHistory(location);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                >
                    {language === "zh" ? "搜尋" : "Search"}
                </button>
            </div>

            {/* 最近搜尋紀錄 */}
            {searchHistory.length > 0 && (
                <div className="mt-3 text-center">
                    <p className="text-sm">{language === "zh" ? "最近搜尋：" : "Recent Searches:"}</p>
                    <ul className="flex gap-2">
                        {searchHistory.map((city, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-yellow-300 underline"
                                onClick={() => {
                                    setLocation(city);
                                    setCompareInput(city); // 🔥 點擊時同步 Compare.js 的輸入框
                                }}
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 設定功能 */}
            <div className="flex gap-4">
                {/* 深色模式切換 */}
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded dark:bg-gray-500 dark:hover:bg-gray-400"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                {/* 語言切換 */}
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded dark:bg-gray-500 dark:hover:bg-gray-400"
                    onClick={toggleLanguage}
                >
                    {language === "zh" ? "🇹🇼 切換英文" : "🇬🇧 Switch to Chinese"}
                </button>
            </div>
        </header>
    );
}

export default Header;