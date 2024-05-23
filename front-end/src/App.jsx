import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./homepage/Home.jsx";
import AnimeTable from "./anime-table/AnimeTable.jsx";
import AnimeDetail from "./anime-detail/AnimeDetail.jsx";
import SearchResult from "./search-result/SearchResult.jsx";
import { TitleProvider } from "./templates/TitleContext.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <TitleProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-anime-series/" element={<AnimeTable />} />
          <Route path="/top-anime-series/:animeId" element={<AnimeDetail />} />
          <Route path="/search-results/" element={<SearchResult />} />
        </Routes>
      </TitleProvider>
    </Router>
  );
}

export default App;
