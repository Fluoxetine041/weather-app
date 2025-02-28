import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext"; // 語言 Context
import { LocationContext } from "../context/LocationContext"; // 共享 `location`
import WeatherCard from "../components/WeatherCard"; // 天氣卡片組件
import { getWeatherData } from "../services/weatherAPI"; // API 請求函式

/**
 * `Home` 組件負責顯示單一城市的天氣資訊，支援雙語
 * - `location` 來自 `LocationContext`（讓 `Header.js` 影響 `Home.js`）
 * - `language` 來自 `LanguageContext`（切換中 / 英文）
 * - 當 `location` 變更時，重新向 API 取得天氣資訊
 * - API 錯誤訊息支援多語系
 */
function Home() {
  const { language } = useContext(LanguageContext); // 讀取目前語言設定
  const { location } = useContext(LocationContext); // 讀取當前的城市名稱
  const [weatherData, setWeatherData] = useState(null); // 儲存天氣數據
  const [error, setError] = useState(null); // 儲存 API 錯誤訊息

  useEffect(() => {
    if (!location) return; // 如果沒有城市名稱，不發送請求

    // 定義異步函式來獲取天氣數據
    const fetchData = async () => {
      setError(null); // 清除舊錯誤訊息

      const data = await getWeatherData(location); // 向 API 請求天氣數據
      if (data) {
        setWeatherData(data); // 更新狀態，儲存天氣數據
      } else {
        setError(language === "zh" ? "無法取得天氣資訊，請檢查城市名稱是否正確" : "Unable to fetch weather data. Please check the city name.");
      }
    };

    fetchData(); // 執行 API 請求
  }, [location, language]); // 監聽 `location` 或 `language` 變更時重新獲取天氣

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-[#121212]">
      {/* 頁面標題，根據語言切換 */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
        {language === "zh" ? `天氣預報 - ${location}` : `Weather Forecast - ${location}`}
      </h1>

      {/* 顯示錯誤訊息，否則顯示天氣資訊卡 */}
      {error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <WeatherCard weatherData={weatherData} />
      )}
    </div>
  );
}

export default Home;