import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./homepage/Home.jsx";
import AnimeTable from "./table/AnimeTable.jsx";
import AnimeDetail from "./detail/AnimeDetail.jsx";
import SearchResult from "./search-result/SearchResult.jsx";
import LoginForm from "./login/LoginForm.jsx";
import { TitleProvider } from "./templates/TitleContext.jsx";
import { Layout } from "antd";
import TypeTable from "./table/TypeTable.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <TitleProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-anime-series/" element={<AnimeTable />} />
            <Route path="/top-anime-series/:animeId" element={<AnimeDetail />}/>
            <Route path="/search-results/" element={<SearchResult />} />
            <Route path="/top-type/:type" element={<TypeTable />} />
            <Route path="/login" element={<LoginForm />} />
            {/* <Route path="/register" element={<RegisterForm />} /> */}
          </Routes>
        </TitleProvider>
      </Router>
    </div>
  );
}

export default App;
