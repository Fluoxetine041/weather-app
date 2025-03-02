/**
 * Forecast.js
 *
 * 此組件負責顯示特定城市未來 5 天的天氣預測，
 * 並將三個圖表（風速、降雨概率、溫度）以響應式網格呈現：
 *  - sm (320px): 垂直堆疊 (1 欄)
 *  - md (768px): 水平排列兩個，第三個換行 (2 欄)
 *  - lg (1024px) 與 xl (1440px): 水平排列三個 (3 欄)
 *
 * 從 Context 取得使用者選擇的城市 (location) 與語言 (language)，
 * 並透過 getForecastData(city) 呼叫 API 取得天氣預測資料。
 *
 * 若資料載入中或發生錯誤，會分別顯示 Loading 或錯誤訊息。
 * 正常狀況下，使用響應式網格將各圖表元件呈現，同時利用 p-4 與 gap-4 保持內外間距。
 */

import React, { useState, useEffect, useContext } from "react";
import { LocationContext } from "../context/LocationContext"; // 使用者選擇的城市
import { LanguageContext } from "../context/LanguageContext"; // 語言設定 (中/英)
import { getForecastData } from "../services/weatherAPI"; // 呼叫天氣預測 API 的函式
import WindSpeedChart from "../components/WindSpeedChart"; // 風速圖表元件
import RainProbabilityChart from "../components/RainProbabilityChart"; // 降雨概率圖表元件
import TemperatureChart from "../components/TemperatureChart"; // 溫度圖表元件
import { getCityName, getCityEnglishName } from "../utils/cityTranslations"; // 城市名稱轉換工具

function Forecast() {
  // 從 Context 取得使用者選擇的城市與語言設定
  const { location } = useContext(LocationContext);
  const { language } = useContext(LanguageContext);

  // 狀態管理：預報資料、錯誤訊息、以及載入狀態
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 當 location 或 language 變化時，取得新的預報資料
  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;
      setError(null);
      // 取得供 API 查詢用的英文城市名稱，例如 "Taipei"
      const cityForAPI = getCityEnglishName(location);
      setLoading(true);

      // 呼叫 API 取得預報資料
      const data = await getForecastData(cityForAPI);
      console.log("📡 API 回應數據:", data);

      // 根據回傳結果更新狀態
      if (data) {
        setForecastData(data);
      } else {
        setError(
          language === "zh"
            ? "無法取得天氣預測資訊，請檢查城市名稱是否正確"
            : "Unable to fetch forecast data. Please check the city name."
        );
      }
      setLoading(false);
    };

    fetchData();
  }, [location, language]);

  // 取得供 UI 顯示用的城市名稱，例如 "台北市" 或 "Taipei"
  const cityForDisplay = getCityName(location, language);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* 標題 */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-300">
        {language === "zh"
          ? `天氣預測圖表 - ${cityForDisplay}`
          : `Weather Forecast Chart- ${cityForDisplay}`}
      </h1>

      {/* 狀態提示：載入中或錯誤訊息 */}
      {loading ? (
        <p className="mt-2">
          {language === "zh" ? "載入中..." : "Loading..."}
        </p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>
      ) : (
        forecastData && (
          // 響應式網格：根據斷點自動調整欄數，並使用 p-4 和 gap-4 保持內外間距
          <div className="p-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 為每個圖表加入 key 與 language prop 以確保語言更新後能重新渲染 */}
            <WindSpeedChart
              key={`wind-${language}`}
              forecastData={forecastData}
              language={language}
            />
            <RainProbabilityChart
              key={`rain-${language}`}
              forecastData={forecastData}
              language={language}
            />
            <TemperatureChart
              key={`temp-${language}`}
              forecastData={forecastData}
              language={language}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Forecast;