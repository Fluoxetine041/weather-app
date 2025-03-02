/**
 * Forecast.js
 *
 * 此組件負責顯示特定城市的未來 5 天天氣預測。
 * - 從 LocationContext 中取得 `location`（使用者輸入或選擇的城市）。
 * - 從 LanguageContext 中取得 `language`（中 / 英文模式）。
 * - 利用 cityTranslations.js 的函式，分別取得「供 API 查詢」與「供 UI 顯示」的城市名稱。
 * - 透過 getForecastData(cityForAPI) 與後端或第三方天氣 API 溝通，取得預測資料。
 * - 根據不同語言顯示對應的標題與錯誤訊息。
 * - 新增 loading 狀態，在資料抓取過程中顯示「載入中...」。
 */

import React, { useState, useEffect, useContext } from "react";
import { LocationContext } from "../context/LocationContext";                    // 取得當前城市
import { LanguageContext } from "../context/LanguageContext";                   // 取得當前語言設定
import { getForecastData } from "../services/weatherAPI";                      // 呼叫預測天氣 API 的函式
import WeatherChart from "../components/WeatherChart";                        // 天氣圖表組件，顯示未來 5 天的天氣數據
import { getCityName, getCityEnglishName } from "../utils/cityTranslations"; // cityTranslations.js：提供將城市名稱做中英轉換的工具函式

function Forecast() {
  // 從 Context 拿到城市與語言，用於後續 API 查詢與介面顯示
  const { location } = useContext(LocationContext);
  const { language } = useContext(LanguageContext);

  // 預報數據、錯誤訊息以及載入中狀態的狀態管理
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * useEffect：
   * 當 location 或 language 改變時執行，
   * 透過 getForecastData() 從 API 取得對應城市的天氣預報，
   * 並在介面上顯示或錯誤處理。
   */
  useEffect(() => {
    const fetchData = async () => {
      // 若沒有城市名稱，不做任何呼叫
      if (!location) return;

      // 先清空錯誤訊息
      setError(null);

      // 取得「API 查詢用」的英文城市名稱 (ex: Taipei)
      const cityForAPI = getCityEnglishName(location);

      // 設定為「載入中」
      setLoading(true);

      // 向天氣 API 取得城市的未來 5 天天氣預測資料
      const data = await getForecastData(cityForAPI);
      console.log("📡 API 回應數據:", data); // 用於偵錯或開發時觀察

      // 根據回傳結果，更新狀態或產生錯誤訊息
      if (data) {
        setForecastData(data);
      } else {
        setError(
          language === "zh"
            ? "無法取得天氣預測資訊，請檢查城市名稱是否正確"
            : "Unable to fetch forecast data. Please check the city name."
        );
      }

      // 結束「載入中」狀態
      setLoading(false);
    };

    // 執行抓取天氣預報的函式
    fetchData();
  }, [location, language]);

  // 取得「顯示用」的城市名稱，根據語言 (ex: 台北市 / Taipei)
  const cityForDisplay = getCityName(location, language);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* 顯示標題：根據語言與 cityForDisplay 動態切換 */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-300">
        {language === "zh"
          ? `未來 5 天天氣預測 - ${cityForDisplay}`
          : `5-Day Weather Forecast - ${cityForDisplay}`}
      </h1>

      {/**
       * 根據不同狀態顯示對應畫面：
       * 1. loading === true → 「載入中...」
       * 2. error 有內容 → 顯示錯誤訊息
       * 3. 正常情況 → 顯示 WeatherChart 組件（傳入預測資料）
       */}
      {loading ? (
        <p className="mt-2">{language === "zh" ? "載入中..." : "Loading..."}</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>
      ) : (
        forecastData && <WeatherChart forecastData={forecastData} />
      )}
    </div>
  );
}

export default Forecast;