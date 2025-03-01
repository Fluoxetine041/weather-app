import axios from "axios";
import { getCityEnglishName, normalizeCityName } from "../utils/cityTranslations"; // 🔥 修正 import

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherData = async (city = "Taipei") => {
  try {
    const normalizedCity = normalizeCityName(city);
    const apiCityName = getCityEnglishName(normalizedCity) || normalizedCity;

    console.log(`📡 請求即時天氣數據: ${apiCityName}`);

    const response = await axios.get(WEATHER_URL, {
      params: {
        q: apiCityName,
        appid: API_KEY,
        units: "metric",
        lang: "zh_tw",
      },
    });

    console.log("🌦️ 即時天氣數據:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 無法獲取即時天氣數據:", error.response?.data || error.message);
    return null;
  }
};

export const getForecastData = async (city = "Taipei") => {
  try {
    const normalizedCity = normalizeCityName(city);
    const apiCityName = getCityEnglishName(normalizedCity) || normalizedCity;

    console.log(`📡 請求未來 5 天的天氣數據: ${apiCityName}`);

    const response = await axios.get(FORECAST_URL, {
      params: {
        q: apiCityName,
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