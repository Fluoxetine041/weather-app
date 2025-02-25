// WeatherCard.js（負責渲染天氣資訊，從 props 接收天氣數據）
import React from 'react'; // 匯入 React

/**
 * WeatherCard 組件：負責顯示天氣資訊
 * @param {Object} weatherData - 從 API 取得的天氣數據
 */
const WeatherCard = ({ weatherData }) => {
  // 如果沒有資料，顯示 "載入中..."
  if (!weatherData) return <p className="text-gray-500">載入中...</p>;

  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      {/* 顯示城市名稱 */}
      <h2 className="text-xl font-bold">{weatherData.name}</h2>
      
      {/* 顯示天氣狀況 */}
      <p>{weatherData.weather[0].description}</p>
      
      {/* 顯示當前溫度 */}
      <p>🌡️ {weatherData.main.temp}°C</p>
    </div>
  );
};

export default WeatherCard; // 匯出 WeatherCard 組件