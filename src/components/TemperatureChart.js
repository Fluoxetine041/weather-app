import React from "react";
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
 * TemperatureChart - 顯示未來 5 天的最高/最低氣溫折線圖
 * @param {Object} forecastData - API 取得的天氣預測數據
 * @param {String} language - 語言設定
 */
function TemperatureChart({ forecastData, language }) {
  if (!forecastData || !forecastData.list) return null;

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

  const labels = Object.keys(dailyData);
  const maxTemperatures = labels.map((date) => dailyData[date].max);
  const minTemperatures = labels.map((date) => dailyData[date].min);

  // Chart.js Data
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

  // Chart.js Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 允許圖表在父容器自適應寬高
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
    // 外層容器：固定高度 h-64，寬度 w-full，讓圖表可自適應填滿
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full h-64">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
        {language === "zh" ? "溫度折線圖" : "Temperature Chart"}
      </h2>
      {/* 圖表佔滿容器 */}
      <div className="w-full h-full">
        <Line data={data} options={options} className="w-full h-full" />
      </div>
    </div>
  );
}

export default TemperatureChart;