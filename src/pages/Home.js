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
   * 第一次進入頁面時，如果 location 為空，
   * 就設定預設城市為「台北市」。同時將 location、setLocation
   * 加入依賴陣列以解決 react-hooks/exhaustive-deps 警告。
   */
  useEffect(() => {
    if (!location) {
      setLocation("台北市");
    }
  }, [location, setLocation]);

  /**
   * 監聽 location & language，有改變時就向 API 取得天氣資料
   */
  useEffect(() => {
    if (!location) return; // 若尚未設定 location，就不執行

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // 取得「API 查詢用」的英文城市名稱
      const cityForAPI = getCityEnglishName(location);

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
  }, [location, language]);

  /**
   * 取得「顯示用」的城市名稱（中/英文）。
   * 若 location 尚未有值，暫時顯示「台北市」。
   */
  const cityForDisplay = location ? getCityName(location, language) : "台北市";

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