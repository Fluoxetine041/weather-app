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
 * WindSpeedChart - 顯示未來 24 小時的風速折線圖
 * @param {Object} forecastData - API 取得的天氣預測數據
 * @param {String} language - 語言設定
 */
function WindSpeedChart({ forecastData, language }) {
  if (!forecastData || !forecastData.list) return null;

  // 取得未來 24 小時風速數據 (前 8 筆，每 3 小時一筆 => 24 小時)
  const labels = forecastData.list.slice(0, 8).map((entry) => entry.dt_txt.split(" ")[1].slice(0, 5)); 
  const windSpeeds = forecastData.list.slice(0, 8).map((entry) => entry.wind.speed);

  const data = {
    labels,
    datasets: [
      {
        label: language === "zh" ? "風速 (m/s)" : "Wind Speed (m/s)",
        data: windSpeeds,
        borderColor: "rgba(75, 192, 192, 1)", // 青色
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 允許圖表在父容器自適應寬高
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: language === "zh" ? "風速 (m/s)" : "Wind Speed (m/s)",
        },
      },
      x: {
        title: {
          display: true,
          text: language === "zh" ? "時間 (HH:MM)" : "Time (HH:MM)",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full h-64">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
        {language === "zh" ? "風速折線圖" : "Wind Speed Chart"}
      </h2>
      <div className="w-full h-full">
        <Line data={data} options={options} className="w-full h-full" />
      </div>
    </div>
  );
}

export default WindSpeedChart;