// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { LocationProvider } from "./context/LocationContext";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Compare from "./pages/Compare";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

/**
 * App 組件:
 * 1. 提供雙語與位置狀態 (LanguageProvider, LocationProvider)
 * 2. 設定路由時使用 basename="/weather-app" 以對應 GitHub Pages 的子路徑
 * 3. 在 main 分支開發後, 透過 npm run deploy 推送到 gh-pages 分支
 */
function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        {/*
          basename="/weather-app" 告訴 React Router
          部署時實際路徑在 https://你的使用者名.github.io/weather-app
        */}
        <Router basename="/weather-app">
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