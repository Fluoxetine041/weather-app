import axios from "axios";

// 從 `.env` 讀取 OpenWeather API Key（避免硬編碼 API 金鑰）
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// OpenWeather API 端點
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

/**
 * 取得即時天氣數據（目前天氣）
 * @param {string} locationName - 查詢的城市名稱（預設為 Taipei）
 * @returns {Object|null} - 成功時回傳天氣數據，失敗時回傳 null
 */
export const getWeatherData = async (locationName = "Taipei") => {
  try {
    console.log(`📡 請求即時天氣數據: ${locationName}`);

    const response = await axios.get(WEATHER_URL, {
      params: {
        q: locationName, // 查詢城市
        appid: API_KEY, // API 金鑰
        units: "metric", // 攝氏溫度
        lang: "zh_tw", // 繁體中文
      },
    });

    console.log("🌦️ 即時天氣數據:", response.data);
    return response.data; // 回傳 API 回應的數據
  } catch (error) {
    console.error("❌ 無法獲取即時天氣數據:", error.response?.data || error.message);
    return null;
  }
};

/**
 * 取得未來 5 天天氣預測數據
 * @param {string} locationName - 查詢的城市名稱（預設為 Taipei）
 * @returns {Object|null} - 成功時回傳天氣預測數據，失敗時回傳 null
 */
export const getForecastData = async (locationName = "Taipei") => {
  try {
    console.log(`📡 請求未來 5 天的天氣數據: ${locationName}`);

    const response = await axios.get(FORECAST_URL, {
      params: {
        q: locationName,
        appid: API_KEY,
        units: "metric",
        lang: "zh_tw",
      },
    });

    console.log("📊 5 天天氣數據:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 無法獲取天氣預測數據:", error.response?.data || error.message);
    return null;
  }
};