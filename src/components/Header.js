import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LocationContext } from "../context/LocationContext"; // 引入 Context

function Header() {
  const { location, setLocation } = useContext(LocationContext);

  return (
    <header className="w-full p-4 bg-blue-500 text-white flex justify-between items-center">
      {/* 左側：導航選單 */}
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">🏠 主頁</Link>
        <Link to="/compare" className="hover:underline">🌍 多城市比較</Link>
        <Link to="/forecast" className="hover:underline">📅 5 天天氣</Link>
      </nav>

      {/* 右側：城市搜尋框 */}
      <input
        type="text"
        className="p-2 border rounded text-black"
        placeholder="輸入城市名稱"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </header>
  );
}

export default Header;