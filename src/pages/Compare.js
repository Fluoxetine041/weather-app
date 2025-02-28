import React, { useState, useEffect, useContext } from "react";
import WeatherCard from "../components/WeatherCard";
import { getWeatherData } from "../services/weatherAPI";
import { LanguageContext } from "../context/LanguageContext"; // 加入語言 Context

function Compare() {
  const { language } = useContext(LanguageContext); // 取得語言設定
  const [cities, setCities] = useState(["臺北市"]); // 預設一個城市
  const [weatherData, setWeatherData] = useState({});
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const newWeatherData = {};
      for (const city of cities) {
        const data = await getWeatherData(city);
        if (data) {
          newWeatherData[city] = data;
        }
      }
      setWeatherData(newWeatherData);
    };

    fetchWeather();
  }, [cities]); // 當 cities 改變時，重新取得天氣資訊

  // 新增城市
  const addCity = () => {
    if (inputCity && !cities.includes(inputCity)) {
      setCities([...cities, inputCity]);
      setInputCity(""); // 清空輸入框
    }
  };

  // 移除城市
  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-300">
        {language === "zh" ? "多城市天氣比較" : "Compare Multiple Cities"}
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          className="p-2 border rounded text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600"
          placeholder={language === "zh" ? "輸入城市名稱" : "Enter city name"}
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button
          onClick={addCity}
          className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          ➕ {language === "zh" ? "新增" : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cities.map((city) => (
          <div key={city} className="relative">
            <WeatherCard weatherData={weatherData[city]} />
            <button
              onClick={() => removeCity(city)}
              className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 text-white p-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Compare;