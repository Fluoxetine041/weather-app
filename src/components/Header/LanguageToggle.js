import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function LanguageToggle() {
  // 從 LanguageContext 獲取當前語言和切換語言的函數
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      className="bg-gray-700 text-white px-4 py-2 rounded"
      onClick={toggleLanguage}
    >
      {language === "zh" ? "TW" : "EN"}
    </button>
  );
}

export default LanguageToggle;