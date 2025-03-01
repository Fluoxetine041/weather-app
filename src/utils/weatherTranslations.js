// src/utils/weatherTranslations.js

// 天氣描述對應表
const weatherTranslations = {
    "多雲": "Cloudy",
    "晴": "Clear",
    "小雨": "Light Rain",
    "中雨": "Moderate Rain",
    "大雨": "Heavy Rain",
    "雷陣雨": "Thunderstorm",
    "毛毛雨": "Drizzle",
    "陣雨": "Showers",
    "霧": "Fog",
    "雪": "Snow",
    "陰": "Overcast",
    "少雲": "Partly Cloudy"
};

/**
 * 翻譯天氣描述（支援組合描述，例如 "陰，多雲"）
 * @param {string} description - 原始天氣描述
 * @param {string} language - "zh" 或 "en"
 * @returns {string} - 翻譯後的天氣描述
 */
export function getTranslatedWeatherDescription(description, language = "zh") {
    if (!description) return description;

    if (language === "en") {
        // 將描述以逗號或空格拆分，逐一翻譯
        return description
            .split(/[,， ]/) // 允許多種分隔符號
            .map(word => weatherTranslations[word.trim()] || word) // 翻譯每個單字
            .join(", "); // 保持原格式
    }

    // 若是翻譯回中文，則尋找對應的英文描述
    return Object.keys(weatherTranslations).find(key => weatherTranslations[key] === description) || description;
}

/**
 * 取得對應的天氣圖示
 * @param {string} description - 天氣描述
 * @returns {string} - Emoji 圖示
 */
export function getWeatherIcon(description) {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("rain") || lowerDesc.includes("雨")) return "🌧️";
    if (lowerDesc.includes("snow") || lowerDesc.includes("雪")) return "❄️";
    if (lowerDesc.includes("cloud") || lowerDesc.includes("雲")) return "⛅";
    if (lowerDesc.includes("clear") || lowerDesc.includes("晴")) return "☀️";
    if (lowerDesc.includes("overcast") || lowerDesc.includes("陰")) return "🌥️";
    return "🌎"; // 預設圖示
}

export default weatherTranslations;