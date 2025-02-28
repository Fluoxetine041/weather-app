import React, { createContext, useState } from "react";

// 建立 Context
export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("臺北市"); // 預設城市
  const [compareInput, setCompareInput] = useState(""); // Compare.js 新增輸入框

  return (
    <LocationContext.Provider value={{ location, setLocation, compareInput, setCompareInput }}>
      {children}
    </LocationContext.Provider>
  );
};