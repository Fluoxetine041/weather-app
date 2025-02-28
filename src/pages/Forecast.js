import React, { useState, useEffect, useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { LanguageContext } from "../context/LanguageContext"; // 加入語言 Context
import { getForecastData } from "../services/weatherAPI";
import WeatherChart from "../components/WeatherChart";

function Forecast() {
  const { location } = useContext(LocationContext); // 取得 `location`
  const { language } = useContext(LanguageContext); // 取得語言設定
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;
      setError(null);

      const data = await getForecastData(location); // 取得天氣預測數據
      console.log("📡 API 回應數據:", data); // 測試 API 回應

      if (data) {
        setForecastData(data);
      } else {
        setError(
          language === "zh"
            ? "無法取得天氣預測資訊，請檢查城市名稱是否正確"
            : "Unable to fetch forecast data. Please check the city name."
        );
      }
    };

    fetchData();
  }, [location, language]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-300">
        {language === "zh"
          ? `未來 5 天天氣預測 - ${location}`
          : `5-Day Weather Forecast - ${location}`}
      </h1>

      {error ? (
        <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>
      ) : (
        forecastData && <WeatherChart forecastData={forecastData} /> // 傳遞數據
      )}
    </div>
  );
}

export default Forecast;