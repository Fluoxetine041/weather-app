//App.js（主應用，負責 UI 和 API 交互）
import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard"; // 匯入 WeatherCard 元件
import { getWeatherData } from "./services/weatherAPI"; // 匯入 API 函式

function App() {
  // 管理用戶輸入的城市名稱
  const [location, setLocation] = useState("臺北市");
  // 存放 API 回傳的天氣數據
  const [weatherData, setWeatherData] = useState(null);
  // 用於顯示錯誤訊息（如 API 失敗或城市名稱錯誤）
  const [error, setError] = useState(null);

  useEffect(() => {
    // 定義異步函式來取得天氣數據
    const fetchData = async () => {
      if (!location) return; // 若 location 為空則不發送請求
      setError(null); // 清除舊的錯誤訊息

      const data = await getWeatherData(location); // 向 API 要求天氣數據
      if (data) {
        setWeatherData(data); // 更新天氣數據
      } else {
        setError("無法取得天氣資訊，請檢查城市名稱是否正確"); // 若請求失敗，設定錯誤訊息
      }
    };

    // 設置防抖 (debounce) 防止用戶輸入過快導致過多 API 請求
    const debounceFetch = setTimeout(fetchData, 800);
    
    // 在 useEffect 重新執行前清除之前的請求，確保只發送最新的請求
    return () => clearTimeout(debounceFetch);
  }, [location]); // 只在 location 變更時執行

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* 頁面標題 */}
      <h1 className="text-3xl font-bold mb-4">天氣預報</h1>

      {/* 文字輸入框，讓用戶輸入城市名稱 */}
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="輸入城市名稱"
        value={location} // 綁定 location 狀態
        onChange={(e) => setLocation(e.target.value)} // 當輸入變更時更新 location
      />

      {/* 如果有錯誤訊息則顯示錯誤，否則顯示 WeatherCard */}
      {error ? <p className="text-red-500 mt-2">{error}</p> : <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App; // 匯出 App 組件