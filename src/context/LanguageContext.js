import React, { createContext, useState } from "react";

// 建立語言 Context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("zh"); // 預設語言為繁體中文

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "zh" ? "en" : "zh"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};