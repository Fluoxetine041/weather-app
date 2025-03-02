import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 註冊 Chart.js 必須的組件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * RainProbabilityChart - 顯示未來 5 天的降雨機率柱狀圖
 * @param {Object} forecastData - API 取得的天氣預測數據
 * @param {String} language - 語言設定
 */
function RainProbabilityChart({ forecastData, language }) {
  if (!forecastData || !forecastData.list) return null;

  // 解析 API 數據，整理為每日的平均降雨機率
  const dailyData = {};
  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // 取得日期 (YYYY-MM-DD)
    const pop = entry.pop || 0; // 降雨機率 (0~1)

    if (!dailyData[date]) {
      dailyData[date] = { popSum: pop, count: 1 };
    } else {
      dailyData[date].popSum += pop;
      dailyData[date].count += 1;
    }
  });

  const labels = Object.keys(dailyData);
  const rainProbabilities = labels.map((date) => (dailyData[date].popSum / dailyData[date].count) * 100); // 轉換為百分比 (%)

  const data = {
    labels,
    datasets: [
      {
        label: language === "zh" ? "降雨機率 (%)" : "Rain Probability (%)",
        data: rainProbabilities,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
        max: 100, // 降雨機率是百分比 (0~100)
        title: {
          display: true,
          text: language === "zh" ? "降雨機率 (%)" : "Rain Probability (%)",
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

  return <Bar data={data} options={options} />;
}

export default RainProbabilityChart;