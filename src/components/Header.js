import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationContext } from "../context/LocationContext";
import { LanguageContext } from "../context/LanguageContext";
import { getCityName, normalizeCityName, cityTranslations } from "../utils/cityTranslations";

function Header() {
    // 從 LocationContext 獲取 setLocation 和 setCompareInput，用於更新當前城市和比較輸入
    const { setLocation, setCompareInput } = useContext(LocationContext);
    // 從 LanguageContext 獲取當前語言和切換語言的函數
    const { language, toggleLanguage } = useContext(LanguageContext);
    // 獲取當前路由位置
    const routeLocation = useLocation();

    // 設定搜索歷史，從 localStorage 讀取，默認為空陣列
    const [searchHistory, setSearchHistory] = useState(() =>
        JSON.parse(localStorage.getItem("searchHistory")) || []
    );
    // 存儲搜索建議的狀態
    const [suggestions, setSuggestions] = useState([]);
    // 控制建議下拉選單的顯示
    const [showDropdown, setShowDropdown] = useState(false);
    // 用於存儲當前輸入框的值
    const [inputValue, setInputValue] = useState("");
    // 控制響應式選單（手機版側邊欄）的開關狀態
    const [menuOpen, setMenuOpen] = useState(false);

    // 記錄深色模式的狀態，從 localStorage 讀取
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // 監聽 darkMode 的變化，更新 localStorage 並切換 body 標籤的樣式
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    // 監聽 searchHistory 的變化，並將其儲存到 localStorage
    useEffect(() => {
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }, [searchHistory]);

    // 保存搜尋歷史，最多保存 5 筆記錄，並確保不重複
    const saveSearchHistory = useCallback((city) => {
        if (!city.trim()) return;
        const normalizedCity = normalizeCityName(city);
        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        history = [normalizedCity, ...history.filter(c => c !== normalizedCity)].slice(0, 5);
        setSearchHistory(history);
    }, []);

    // 當輸入框獲得焦點時，顯示搜尋歷史作為建議
    const handleInputFocus = () => {
        if (!inputValue.trim()) {
            setSuggestions(searchHistory);
            setShowDropdown(true);
        }
    };

    // 處理輸入框的變化，根據輸入的內容篩選建議
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (!value.trim()) {
            setSuggestions(searchHistory);
            return;
        }

        // 根據輸入內容匹配城市名稱（中文、英文、別名）
        const filteredSuggestions = Object.keys(cityTranslations).filter((key) => {
            const { zh, en, aliases } = cityTranslations[key];
            const inputLower = value.toLowerCase();
            return (
                zh.startsWith(value) ||
                en.toLowerCase().startsWith(inputLower) ||
                aliases.some(alias => alias.startsWith(value))
            );
        });

        setSuggestions([...new Set(filteredSuggestions)]);
        setShowDropdown(true);
    };

    // 當使用者點擊建議時，設定當前城市並更新搜尋歷史
    const handleSuggestionClick = useCallback((city) => {
        const displayCity = getCityName(city, language);
        setLocation(displayCity);
        saveSearchHistory(displayCity);
        setSuggestions([]);
        setShowDropdown(false);
        setInputValue("");

        // 如果當前路由為比較頁面，則更新比較輸入框
        if (routeLocation.pathname === "/compare") {
            setCompareInput(displayCity);
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent("addCityFromHeader", { detail: displayCity }));
            }, 0);
        }
    }, [language, saveSearchHistory, routeLocation.pathname, setCompareInput, setLocation]);

    // 監聽鍵盤事件，按下 Enter 鍵時自動選擇當前輸入的城市
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && inputValue.trim()) {
                handleSuggestionClick(inputValue);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [inputValue, handleSuggestionClick]);

    return (
        <header className="w-full p-4 bg-gray-900 text-gray-300 flex justify-between items-center dark:bg-[#121212] sticky top-0 z-50">
            {/* 響應式選單按鈕（僅在小屏幕顯示） */}
            <div className="flex items-center lg:hidden">
                <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
            </div>

            {/* 導航選單（大屏幕顯示） */}
            <nav className="hidden lg:flex gap-4 whitespace-nowrap overflow-hidden">
                <Link to="/" className="hover:underline">{language === "zh" ? "主頁" : "Home"}</Link>
                <Link to="/compare" className="hover:underline">{language === "zh" ? "常用城市" : "Saved Cities"}</Link>
                <Link to="/forecast" className="hover:underline">{language === "zh" ? "五日預報" : "5-Day Forecast"}</Link>
            </nav>

            {/* 搜索框 */}
            <div className="relative flex items-center gap-2">
                <input
                    type="text"
                    className="p-3 border rounded text-black dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 w-full md:w-[600px] lg:w-[750px] mx-auto"
                    placeholder={language === "zh" ? "輸入城市名稱..." : "Enter city name..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />

                {/* 建議列表（動態顯示） */}
                {showDropdown && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 text-black z-10 rounded shadow-lg">
                        {suggestions.map((city, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onMouseDown={() => handleSuggestionClick(city)}
                            >
                                {getCityName(city, language)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 深色模式切換 & 語言切換按鈕 */}
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