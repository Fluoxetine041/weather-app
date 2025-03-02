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

  // 取得未來 24 小時風速數據
  const labels = forecastData.list.slice(0, 8).map((entry) => entry.dt_txt.split(" ")[1].slice(0, 5)); // 取 "HH:MM" 時間格式
  const windSpeeds = forecastData.list.slice(0, 8).map((entry) => entry.wind.speed); // 取得風速 (m/s)

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

  return <Line data={data} options={options} />;
}

export default WindSpeedChart;