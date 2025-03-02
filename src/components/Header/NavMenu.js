import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

function NavMenu() {
  // 控制小螢幕漢堡選單的開關狀態
  const [menuOpen, setMenuOpen] = useState(false);
  // 從 LanguageContext 取得當前語言
  const { language } = useContext(LanguageContext);

  return (
    <>
      {/* 響應式選單按鈕（僅在小屏幕顯示） */}
      <div className="flex items-center lg:hidden">
        <button 
          className="bg-gray-700 text-white px-4 py-2 rounded" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 導航選單（大屏幕顯示） */}
      <nav className="hidden lg:flex gap-4 whitespace-nowrap overflow-hidden">
        <Link to="/" className="hover:underline">
          {language === "zh" ? "主頁" : "Home"}
        </Link>
        <Link to="/compare" className="hover:underline">
          {language === "zh" ? "常用城市" : "Saved Cities"}
        </Link>
        <Link to="/forecast" className="hover:underline">
          {language === "zh" ? "五日預報" : "5-Day Forecast"}
        </Link>
      </nav>

      {/* 導航選單（小屏幕顯示，僅在 menuOpen 為 true 時呈現） */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-gray-700 text-white p-4 flex flex-col gap-4 lg:hidden">
          <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {language === "zh" ? "主頁" : "Home"}
          </Link>
          <Link to="/compare" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {language === "zh" ? "常用城市" : "Saved Cities"}
          </Link>
          <Link to="/forecast" className="hover:underline" onClick={() => setMenuOpen(false)}>
            {language === "zh" ? "五日預報" : "5-Day Forecast"}
          </Link>
        </nav>
      )}
    </>
  );
}

export default NavMenu;