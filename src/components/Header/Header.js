import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";
import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";

function Header() {
  return (
    // 加上 relative 以方便子元件中使用絕對定位（例如小螢幕下拉選單）
    <header className="w-full p-4 bg-gray-900 text-gray-300 flex justify-between items-center dark:bg-[#121212] sticky top-0 z-50 relative">
      {/* 左側：漢堡選單 / 大螢幕導覽連結 */}
      <NavMenu />
      {/* 中間：搜尋欄 */}
      <SearchBar />
      {/* 右側：深色模式 & 語言切換按鈕 */}
      <div className="flex gap-4">
        <DarkModeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}

export default Header;