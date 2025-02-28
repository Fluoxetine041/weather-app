import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import WeatherCard from "../components/WeatherCard";
import { getWeatherData } from "../services/weatherAPI";

function Home() {
  const { location } = useContext(LocationContext); // 讀取 `location`
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

    fetchData();
  }, [location]); // 當 `location` 變更時，重新獲取天氣資訊

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">天氣預報 - {location}</h1>

      {error ? <p className="text-red-500 mt-2">{error}</p> : <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default Home;