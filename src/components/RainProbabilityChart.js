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
  const rainProbabilities = labels.map(
    (date) => (dailyData[date].popSum / dailyData[date].count) * 100 // 轉換為百分比
  );

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
    maintainAspectRatio: false, // 允許圖表在父容器自適應寬高
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full h-64">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
        {language === "zh" ? "降雨機率柱狀圖" : "Rain Probability Chart"}
      </h2>
      <div className="w-full h-full">
        <Bar data={data} options={options} className="w-full h-full" />
      </div>
    </div>
  );
}

export default RainProbabilityChart;