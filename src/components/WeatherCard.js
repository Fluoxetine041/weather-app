// WeatherCard.js - 負責渲染天氣資訊
import React from "react";

/**
 * WeatherCard 組件：顯示 API 回傳的天氣資訊
 * @param {Object} weatherData - API 取得的天氣數據
 */
const WeatherCard = ({ weatherData }) => {
  // 檢查是否有資料，避免 `undefined` 錯誤
  if (!weatherData || !weatherData.main || !weatherData.weather)
    return <p className="text-gray-500">載入中...</p>;

  // 取得天氣描述與對應的圖示
  const weatherDescription = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const cityName = weatherData.name;

  // 簡單的天氣圖示對應
  const getWeatherIcon = (description) => {
    if (description.includes("雨")) return "🌧️";
    if (description.includes("雪")) return "❄️";
    if (description.includes("雲")) return "⛅";
    if (description.includes("晴")) return "☀️";
    return "🌎"; // 預設圖示
  };

  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      {/* 顯示城市名稱 */}
      <h2 className="text-xl font-bold">{cityName}</h2>

      {/* 顯示天氣圖示與描述 */}
      <p className="text-lg flex items-center gap-2">
        {getWeatherIcon(weatherDescription)} {weatherDescription}
      </p>

      {/* 顯示當前溫度與體感溫度 */}
      <p className="text-2xl font-bold">🌡️ {temperature}°C</p>
      <p className="text-sm">體感溫度: {feelsLike}°C</p>

      {/* 顯示風速與濕度 */}
      <div className="flex gap-4 mt-2">
        <p>💨 風速: {windSpeed} m/s</p>
        <p>💧 濕度: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;