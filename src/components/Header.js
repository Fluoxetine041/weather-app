import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationContext } from "../context/LocationContext";
import { LanguageContext } from "../context/LanguageContext";
import { getCityName, normalizeCityName, cityTranslations } from "../utils/cityTranslations"; // 🔥 確保 cityTranslations 被導入

function Header() {
    const { location, setLocation, setCompareInput } = useContext(LocationContext);
    const { language, toggleLanguage } = useContext(LanguageContext);
    const routeLocation = useLocation();

    // 搜尋紀錄（最多 5 筆）
    const [searchHistory, setSearchHistory] = useState(() =>
        JSON.parse(localStorage.getItem("searchHistory")) || []
    );

    // 搜尋建議清單
    const [suggestions, setSuggestions] = useState([]);

    // 讀取 LocalStorage 設定暗黑模式
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    // 更新搜尋紀錄
    const saveSearchHistory = useCallback((city) => {
        if (!city.trim()) return;

        const normalizedCity = normalizeCityName(city); // 🔥 只在搜尋時標準化

        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        history = [normalizedCity, ...history.filter(c => c !== normalizedCity)].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        setSearchHistory(history);
    }, []);

    // 🔹 處理輸入框變更 & 提供建議選項
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setLocation(inputValue);

        if (!inputValue.trim()) {
            setSuggestions([]); // 若沒有輸入則清空建議
            return;
        }

        // 🔥 過濾符合輸入的城市名稱
        const filteredSuggestions = Object.keys(cityTranslations).filter((key) => {
            const { zh, en, aliases } = cityTranslations[key];
            const inputLower = inputValue.toLowerCase();
        
            return (
                zh.startsWith(inputValue) ||  // 🔥 中文開頭匹配
                en.toLowerCase().startsWith(inputLower) || // 🔥 英文開頭匹配
                aliases.some(alias => alias.startsWith(inputValue)) // 🔥 讓別名也支持建議
            );
        });        

        setSuggestions(filteredSuggestions);
    };

    // 🔹 點擊建議選項
    const handleSuggestionClick = (city) => {
        const displayCity = getCityName(city, language); // 🔥 根據當前語言轉換名稱
        setLocation(displayCity);
        setSuggestions([]); // 選擇後清空建議
    };

// 🔹 處理 Enter 鍵事件（這裡才進行標準化）
const handleEnterPress = useCallback((e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (!location.trim()) return;

        const normalizedLocation = normalizeCityName(location); // 🔥 按下 Enter 時標準化

        setLocation(normalizedLocation);
        saveSearchHistory(normalizedLocation);

        // ✅ 讓 Compare 頁面監聽 Header 搜尋
        if (routeLocation.pathname === "/compare") {
            setCompareInput(normalizedLocation);
            document.dispatchEvent(new CustomEvent("addCityFromHeader"));
        }
    }
}, [location, saveSearchHistory, routeLocation.pathname, setCompareInput, setLocation]); // ✅ 加入 `setLocation`

useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);
    return () => {
        document.removeEventListener("keydown", handleEnterPress);
    };
}, [handleEnterPress]);

    return (
        <header className="w-full p-4 bg-gray-900 text-gray-300 flex justify-between items-center dark:bg-[#121212]">
            {/* 🔹 導航選單 */}
            <nav className="flex gap-4">
                <Link to="/" className="hover:underline">{language === "zh" ? "主頁" : "Home"}</Link>
                <Link to="/compare" className="hover:underline">{language === "zh" ? "常用城市" : "Saved Cities"}</Link>
                <Link to="/forecast" className="hover:underline">{language === "zh" ? "五日預報" : "5-Day Forecast"}</Link>
            </nav>

            <div className="relative flex items-center gap-2">
                <input
                    type="text"
                    className="p-2 border rounded text-black dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                    placeholder={language === "zh" ? "輸入城市名稱..." : "Enter city name..."}
                    value={location}
                    onChange={handleInputChange} // 🔥 監聽輸入並顯示建議
                />

                {/* 🔹 顯示建議選項 */}
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 text-black z-10 rounded">
                        {suggestions.map((city, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSuggestionClick(city)}
                            >
                                {getCityName(city, language)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 🔹 最近搜尋紀錄（支援雙語 & 標準化處理） */}
            {searchHistory.length > 0 && (
                <div className="mt-3 text-center">
                    <p className="text-sm">{language === "zh" ? "最近搜尋：" : "Recent Searches:"}</p>
                    <ul className="flex gap-2">
                        {searchHistory.map((city, index) => {
                            const displayCity = getCityName(city, language); // 🔥 轉換為當前語言的城市名稱
                            return (
                                <li
                                    key={index}
                                    className="cursor-pointer text-yellow-300 underline"
                                    onClick={() => {
                                        setLocation(city);
                                        if (routeLocation.pathname === "/compare") {
                                            setCompareInput(city);
                                            document.dispatchEvent(new CustomEvent("addCityFromHeader"));
                                        }
                                    }}
                                >
                                    {displayCity} {/* 🔥 確保顯示的是轉換後的名稱 */}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {/* 🔹 設定功能 */}
            <div className="flex gap-4">
                <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={toggleLanguage}>
                    {language === "zh" ? "TW" : "EN"}
                </button>
            </div>
        </header>
    );
}

export default Header;