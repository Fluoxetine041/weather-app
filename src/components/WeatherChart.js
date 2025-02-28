import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext"; // 加入語言 Context
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 註冊 Chart.js 必須的組件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * WeatherChart - 顯示未來 5 天的氣溫趨勢
 * @param {Object} forecastData - API 取得的天氣預測數據
 */
function WeatherChart({ forecastData }) {
  const { language } = useContext(LanguageContext); // 取得語言設定

  if (!forecastData || !forecastData.list)
    return <p className="text-gray-500 dark:text-gray-300">{language === "zh" ? "載入中..." : "Loading..."}</p>;

  // 解析 API 數據，整理為每日的最高/最低溫
  const dailyData = {};
  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // 取得日期 (YYYY-MM-DD)
    const temp = entry.main.temp;

    if (!dailyData[date]) {
      dailyData[date] = { max: temp, min: temp };
    } else {
      dailyData[date].max = Math.max(dailyData[date].max, temp);
      dailyData[date].min = Math.min(dailyData[date].min, temp);
    }
  });

  // 提取日期與氣溫
  const labels = Object.keys(dailyData);
  const maxTemperatures = labels.map((date) => dailyData[date].max);
  const minTemperatures = labels.map((date) => dailyData[date].min);

  // 設定 Chart.js 的數據
  const data = {
    labels,
    datasets: [
      {
        label: language === "zh" ? "最高氣溫 (°C)" : "Max Temperature (°C)",
        data: maxTemperatures,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
      },
      {
        label: language === "zh" ? "最低氣溫 (°C)" : "Min Temperature (°C)",
        data: minTemperatures,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  // 設定圖表選項
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: language === "zh" ? "氣溫 (°C)" : "Temperature (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: language === "zh" ? "日期" : "Date",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-center text-lg font-bold mb-2 dark:text-white">
        {language === "zh" ? "未來 5 天天氣趨勢" : "5-Day Weather Trend"}
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default WeatherChart;