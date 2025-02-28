// App.js - 管理應用的全域結構
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext"; // 引入 Context
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Compare from "./pages/Compare";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
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
  );
}

export default App;