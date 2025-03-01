import React, { useState, useEffect, useContext } from "react";
import WeatherCard from "../components/WeatherCard";
import { getWeatherData } from "../services/weatherAPI";
import { LanguageContext } from "../context/LanguageContext";
import { LocationContext } from "../context/LocationContext"; // 確保能接收 compareInput

function Compare() {
    const { language } = useContext(LanguageContext);
    const { compareInput } = useContext(LocationContext); // 從 Header 取得 compareInput
    const [cities, setCities] = useState(["臺北市"]); 
    const [weatherData, setWeatherData] = useState({});

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
    }, [cities]); 

    // 監聽 Header 觸發的新增事件
    useEffect(() => {
        const handleAddCity = () => {
            if (compareInput && !cities.includes(compareInput)) {
                setCities([...cities, compareInput]); // 加入新的城市
            }
        };

        document.addEventListener("addCityFromHeader", handleAddCity);
        return () => {
            document.removeEventListener("addCityFromHeader", handleAddCity);
        };
    }, [compareInput, cities]); // 監聽 compareInput 變化

    // 移除城市
    const removeCity = (city) => {
        setCities(cities.filter((c) => c !== city));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-300">
                {language === "zh" ? "多城市天氣比較" : "Compare Multiple Cities"}
            </h1>

            {/* 城市天氣資訊 */}
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