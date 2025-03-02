import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

function NavMenu() {
  // 控制漢堡選單的展開/收起
  const [menuOpen, setMenuOpen] = useState(false);
  // 從 LanguageContext 取得當前語言
  const { language } = useContext(LanguageContext);

  return (
    <>
      {/* 漢堡按鈕：在 xl (1440px) 以下顯示，1440px 以上隱藏 */}
      <div className="flex items-center xl:hidden">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 大螢幕導覽連結：在 xl (1440px) 以上顯示，1440px 以下隱藏 */}
      <nav className="hidden xl:flex gap-4 whitespace-nowrap overflow-hidden">
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

      {/* 下拉選單：在 xl (1440px) 以下顯示，若 menuOpen 為 true 時 */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-gray-700 text-white p-4 flex flex-col gap-4 xl:hidden">
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