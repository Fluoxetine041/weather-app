import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { LanguageContext } from "../../context/LanguageContext";
import { getCityName, normalizeCityName, cityTranslations } from "../../utils/cityTranslations";

function SearchBar() {
  // 從 Context 中取得設定當前城市與比較輸入的函數
  const { setLocation, setCompareInput } = useContext(LocationContext);
  const { language } = useContext(LanguageContext);
  // 獲取當前路由位置
  const routeLocation = useLocation();

  // 從 localStorage 讀取搜尋歷史
  const [searchHistory, setSearchHistory] = useState(() =>
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  // 存儲搜尋建議狀態
  const [suggestions, setSuggestions] = useState([]);
  // 控制建議下拉選單的顯示
  const [showDropdown, setShowDropdown] = useState(false);
  // 當前輸入框的值
  const [inputValue, setInputValue] = useState("");

  // 當 searchHistory 改變時，更新 localStorage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 保存搜尋歷史，最多保存 5 筆且不重複
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

  // 根據輸入內容篩選建議
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value.trim()) {
      setSuggestions(searchHistory);
      return;
    }
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

  // 當使用者點擊建議時，更新當前城市並處理比較頁面的邏輯
  const handleSuggestionClick = useCallback((city) => {
    const displayCity = getCityName(city, language);
    setLocation(displayCity);
    saveSearchHistory(displayCity);
    setSuggestions([]);
    setShowDropdown(false);
    setInputValue("");
    if (routeLocation.pathname === "/compare") {
      setCompareInput(displayCity);
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("addCityFromHeader", { detail: displayCity }));
      }, 0);
    }
  }, [language, saveSearchHistory, routeLocation.pathname, setCompareInput, setLocation]);

  // 監聽鍵盤事件：按下 Enter 鍵時選擇當前輸入的城市
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
    // 使用 flex-1 讓搜尋欄自動撐滿可用空間
    <div className="relative flex items-center gap-2 flex-1">
      <input
        type="text"
        className="p-3 border rounded text-black dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 w-full"
        placeholder={language === "zh" ? "輸入城市名稱..." : "Enter city name..."}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
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
  );
}

export default SearchBar;