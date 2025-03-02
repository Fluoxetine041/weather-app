import React from "react";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";

function Header() {
  return (
    <header className="w-full bg-gray-900 text-gray-300 dark:bg-[#121212] sticky top-0 z-50">
      {/* p-4 讓整個 Header 與螢幕邊緣保持內距 */}
      <div className="p-4 flex items-center gap-4">
        {/* 左側：漢堡選單 / 大螢幕導覽連結 */}
        <NavMenu />

        {/* 中間：搜尋欄，flex-1 會自動擴展填滿可用空間 */}
        <SearchBar />

        {/* 右側：深色模式 & 語言切換按鈕 */}
        <div className="flex gap-4">
          <DarkModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;