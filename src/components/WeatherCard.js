import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { getCityName } from "../utils/cityTranslations"; // 改為從 cityTranslations.js 取得城市名稱
import { getTranslatedWeatherDescription } from "../utils/weatherTranslations"; // 確保只導入一次

/**
 * WeatherCard 組件：顯示 API 回傳的天氣資訊
 * @param {Object} weatherData - API 取得的天氣數據
 */
const WeatherCard = ({ weatherData }) => {
  const { language } = useContext(LanguageContext); // 取得語言設定

  // 檢查是否有資料，避免 `undefined` 錯誤
  if (!weatherData || !weatherData.main || !weatherData.weather)
    return <p className="text-gray-500 dark:text-gray-300 text-center">{language === "zh" ? "載入中..." : "Loading..."}</p>;

  // 取得天氣描述與對應的數據
  const rawWeatherDescription = weatherData.weather[0].description;
  const weatherDescription = getTranslatedWeatherDescription(rawWeatherDescription, language); // 翻譯天氣描述
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const cityName = getCityName(weatherData.name, language); // 使用 getCityName 取得正確的語言名稱

  // 天氣圖示對應
  const getWeatherIcon = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("雨") || lowerDesc.includes("rain")) return "🌧️";
    if (lowerDesc.includes("雪") || lowerDesc.includes("snow")) return "❄️";
    if (lowerDesc.includes("雲") || lowerDesc.includes("cloud")) return "⛅";
    if (lowerDesc.includes("晴") || lowerDesc.includes("clear")) return "☀️";
    return "🌎"; // 預設圖示
  };

  return (
    <div className="w-80 h-56 bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center justify-center dark:bg-gray-800 dark:text-white overflow-hidden">
      {/* 顯示城市名稱 */}
      <h2 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{cityName}</h2>

      {/* 顯示天氣圖示與描述 */}
      <p className="text-lg flex items-center gap-2">
        {getWeatherIcon(weatherDescription)} {weatherDescription}
      </p>

      {/* 顯示當前溫度與體感溫度 */}
      <p className="text-2xl font-bold">🌡️ {temperature}°C</p>
      <p className="text-sm">{language === "zh" ? "體感溫度" : "Feels like"}: {feelsLike}°C</p>

      {/* 顯示風速與濕度 */}
      <div className="flex gap-4 mt-2">
        <p>💨 {language === "zh" ? "風速" : "Wind Speed"}: {windSpeed} m/s</p>
        <p>💧 {language === "zh" ? "濕度" : "Humidity"}: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;