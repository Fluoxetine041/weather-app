// 🔥 修正：讓 cityTranslations 變成可以被導入的變數
export const cityTranslations = {
    "Keelung": { zh: "基隆市", en: "Keelung", aliases: ["基隆"] },
    "Taipei": { zh: "台北市", en: "Taipei", aliases: ["台北", "臺北"] },
    "Taoyuan": { zh: "桃園市", en: "Taoyuan", aliases: ["桃園"] },
    "Hsinchu": { zh: "新竹市", en: "Hsinchu", aliases: ["新竹"] },
    "Miaoli": { zh: "苗栗縣", en: "Miaoli", aliases: ["苗栗"] },
    "Taichung": { zh: "台中市", en: "Taichung", aliases: ["台中", "臺中"] },
    "Changhua": { zh: "彰化縣", en: "Changhua", aliases: ["彰化"] },
    "Yunlin": { zh: "雲林縣", en: "Yunlin", aliases: ["雲林"] },
    "Nantou": { zh: "南投縣", en: "Nantou", aliases: ["南投"] },
    "Chiayi": { zh: "嘉義市", en: "Chiayi", aliases: ["嘉義"] },
    "Tainan": { zh: "台南市", en: "Tainan", aliases: ["台南", "臺南"] },
    "Kaohsiung": { zh: "高雄市", en: "Kaohsiung", aliases: ["高雄"] },
    "Pingtung": { zh: "屏東縣", en: "Pingtung", aliases: ["屏東"] },
    "Yilan": { zh: "宜蘭縣", en: "Yilan", aliases: ["宜蘭"] },
    "Hualien": { zh: "花蓮縣", en: "Hualien", aliases: ["花蓮"] },
    "Taitung": { zh: "台東縣", en: "Taitung", aliases: ["台東", "臺東"] }
};

/**
 * 標準化城市名稱，確保 API 能夠正確查詢
 * @param {string} cityName - 用戶輸入的城市名稱
 * @returns {string} - 回傳標準化名稱（如「台北市」）
 */
export function normalizeCityName(cityName) {
    if (!cityName) return cityName;

    const cleanedName = cityName
        .trim()
        .replace(/臺/g, "台") // 轉換「臺」為「台」
        .replace(/縣|市/g, ""); // 去掉「市」與「縣」

    for (const key in cityTranslations) {
        const { zh, aliases } = cityTranslations[key];
        if (zh.replace(/縣|市/g, "") === cleanedName || aliases.includes(cleanedName)) {
            return zh; // 確保 API 傳遞的是標準中文名稱
        }
    }
    return cityName; // 如果找不到則回傳原始名稱
}

/**
 * 取得指定語言的城市名稱
 * @param {string} city - 原始城市名稱（可能來自 API 或用戶輸入）
 * @param {string} language - "zh" 或 "en"
 * @returns {string} - 該語言對應的城市名稱
 */
export function getCityName(city, language = "zh") {
    const normalizedCity = normalizeCityName(city);

    for (const key in cityTranslations) {
        if (
            key.toLowerCase() === normalizedCity.toLowerCase() ||
            cityTranslations[key].zh === normalizedCity ||
            cityTranslations[key].aliases.includes(normalizedCity)
        ) {
            return language === "zh" ? cityTranslations[key].zh : cityTranslations[key].en;
        }
    }

    return city; // 若找不到對應翻譯，則直接返回原始輸入的城市名稱
}

/**
 * 取得城市的英文名稱（用於 API 查詢）
 * @param {string} city - 用戶輸入的城市名稱
 * @returns {string} - API 可接受的城市英文名稱
 */
export function getCityEnglishName(city) {
    const normalizedCity = normalizeCityName(city);

    for (const key in cityTranslations) {
        if (
            key.toLowerCase() === normalizedCity.toLowerCase() ||
            cityTranslations[key].zh === normalizedCity ||
            cityTranslations[key].aliases.includes(normalizedCity)
        ) {
            return cityTranslations[key].en;
        }
    }

    return city; // 若無對應則回傳原始名稱
}

// ✅ 這裡不再 `export default`，因為 `cityTranslations` 已經用 `export const` 了！