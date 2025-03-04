import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext"; 
import { LocationContext } from "../context/LocationContext";
import WeatherCard from "../components/WeatherCard";
import { getWeatherData } from "../services/weatherAPI";
import { getCityName, getCityEnglishName } from "../utils/cityTranslations";

function Home() {
  const { language } = useContext(LanguageContext);
  const { location, setLocation } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * 為了解決初次進入頁面時無法取得天氣資料的問題：
   * 1. 當 location 為 null 時，我們使用 "台北市" 作為預設查詢城市。
   * 2. 同時透過 setLocation 將 context 裡的 location 設定為 "台北市"，以便其他頁面也能同步此設定。
   * 3. 這樣即使第一次渲染時 location 還沒更新，也能立刻用預設值抓取天氣資料。
   */
  useEffect(() => {
    // 若 location 尚未設定，使用預設值 "台北市"
    const effectiveLocation = location || "台北市";

    // 如果還沒設定，更新 context
    if (!location) {
      setLocation("台北市");
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // 取得 API 查詢用的英文城市名稱
      const cityForAPI = getCityEnglishName(effectiveLocation);

      try {
        const data = await getWeatherData(cityForAPI);
        if (data) {
          setWeatherData(data);
        } else {
          setError(
            language === "zh"
              ? "無法取得天氣資訊，請檢查城市名稱是否正確"
              : "Unable to fetch weather data."
          );
        }
      } catch (err) {
        setError(
          language === "zh"
            ? "API 請求失敗，請稍後再試。"
            : "API request failed, please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, language, setLocation]);

  // 若 location 還未設定，預設顯示「台北市」
  const cityForDisplay = getCityName(location || "台北市", language);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
        {language === "zh"
          ? `天氣預報 - ${cityForDisplay}`
          : `Weather Forecast - ${cityForDisplay}`}
      </h1>

      {loading ? (
        <p className="mt-2">
          {language === "zh" ? "載入中..." : "Loading..."}
        </p>
      ) : error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : null}
    </div>
  );
}

export default Home;