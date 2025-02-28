// App.js - 管理應用的全域結構
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // 語言 Context
import { LocationProvider } from "./context/LocationContext"; // 位置 Context
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Compare from "./pages/Compare";
import Header from "./components/Header";
import Footer from "./components/Footer";

/**
 * `App` 組件負責應用的全域結構，包含：
 * - `LanguageProvider`（提供雙語支援）
 * - `LocationProvider`（管理 `location` 共享狀態）
 * - `Router`（管理前端路由，包含 `Home.js`、`Forecast.js`、`Compare.js`）
 */
function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/compare" element={<Compare />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </LanguageProvider>
  );
}

export default App;