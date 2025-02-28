// Home.js - 負責首頁的天氣顯示
import React, { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard"; // 確保正確引入
import { getWeatherData } from "../services/weatherAPI"; // API 請求函式

function Home() {
  const [location, setLocation] = useState("臺北市");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;
      setError(null);

      const data = await getWeatherData(location);
      if (data) {
        setWeatherData(data);
      } else {
        setError("無法取得天氣資訊，請檢查城市名稱是否正確");
      }
    };

    const debounceFetch = setTimeout(fetchData, 800);
    return () => clearTimeout(debounceFetch);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">天氣預報</h1>

      <input
        type="text"
        className="p-2 border rounded"
        placeholder="輸入城市名稱"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {error ? <p className="text-red-500 mt-2">{error}</p> : <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default Home;