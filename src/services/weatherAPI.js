import axios from 'axios'; // 匯入 axios 用於發送 HTTP 請求

// 設定 OpenWeather API Key
const API_KEY = '1f731fcd0e81b7ae67c9d737bce5c589';
// 設定 API 基本網址
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * 取得天氣數據的異步函式
 * @param {string} locationName - 使用者輸入的城市名稱
 * @returns {Object|null} - 成功時回傳天氣數據，失敗時回傳 null
 */
export const getWeatherData = async (locationName = "Taipei") => {
  try {
    // 發送 GET 請求
    const response = await axios.get(BASE_URL, {
      params: {
        q: locationName, // 查詢的城市名稱
        appid: API_KEY, // API 金鑰
        units: 'metric', // 取得攝氏溫度
        lang: 'zh_tw' // 設定回應語言為繁體中文
      }
    });

    return response.data; // 回傳 API 回應的數據
  } catch (error) {
    // 若請求失敗，輸出錯誤訊息並回傳 null
    console.error("無法獲取天氣數據", error.response?.data || error.message);
    return null;
  }
};