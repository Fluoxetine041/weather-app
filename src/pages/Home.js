import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext"; 
import { LocationContext } from "../context/LocationContext";
import WeatherCard from "../components/WeatherCard";
import { getWeatherData } from "../services/weatherAPI";

// 1. 引入 cityTranslations.js 的函式
import { getCityName, getCityEnglishName } from "../utils/cityTranslations";

function Home() {
  const { language } = useContext(LanguageContext);
  const { location } = useContext(LocationContext); // location 可能是使用者輸入或選擇的原始字串
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // 2. 取得「API 查詢用」的英文城市名稱
      const cityForAPI = getCityEnglishName(location);

      // 呼叫天氣 API
      const data = await getWeatherData(cityForAPI);
      if (data) {
        setWeatherData(data);
      } else {
        setError(
          language === "zh"
            ? "無法取得天氣資訊，請檢查城市名稱是否正確"
            : "Unable to fetch weather data. Please check the city name."
        );
      }
      setLoading(false);
    };

    fetchData();
  }, [location, language]);

  // 3. 取得「顯示用」的城市名稱（中/英文）
  const cityForDisplay = getCityName(location, language);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
        {language === "zh"
          ? `天氣預報 - ${cityForDisplay}`
          : `Weather Forecast - ${cityForDisplay}`}
      </h1>

      {loading ? (
        <p className="mt-2">{language === "zh" ? "載入中..." : "Loading..."}</p>
      ) : error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <WeatherCard weatherData={weatherData} />
      )}
    </div>
  );
}

export default Home;