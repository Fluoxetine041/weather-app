import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import TemperatureChart from "./TemperatureChart";
import RainProbabilityChart from "./RainProbabilityChart";
import WindSpeedChart from "./WindSpeedChart";

/**
 * WeatherChart - 顯示未來 5 天的氣溫與降雨機率與風速
 * @param {Object} forecastData - API 取得的天氣預測數據
 */
function WeatherChart({ forecastData }) {
  const { language } = useContext(LanguageContext);

  if (!forecastData || !forecastData.list)
    return <p className="text-gray-500 dark:text-gray-300">{language === "zh" ? "載入中..." : "Loading..."}</p>;

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-center text-lg font-bold mb-2 dark:text-white">
        {language === "zh" ? "未來 5 天天氣趨勢" : "5-Day Weather Trend"}
      </h2>
      <TemperatureChart forecastData={forecastData} language={language} />
      <RainProbabilityChart forecastData={forecastData} language={language} />
      <WindSpeedChart forecastData={forecastData} language={language} />
    </div>
  );
}

export default WeatherChart;