import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./homepage/Home.jsx";
import AnimeDetail from "./anime-detail/AnimeDetail.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime-detail/:animeId" element={<AnimeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
