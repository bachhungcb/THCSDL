import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import AnimeTable from "./table/AnimeTable.jsx";
import AnimeDetail from "./pages/animeDetail";
import SearchResult from "./pages/search-result";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";
import Profile from "./user/Profile.jsx";
import { TitleProvider } from "./templates/TitleContext.jsx";
import TypeTable from "./table/TypeTable.jsx";
import CharacterTable from "./table/CharacterTable.jsx";
import CharacterDetail from "./pages/charDetail/CharacterDetail.jsx";
import Dashboard from "./dashboard/DashBoard.jsx";
import "./App.css";
import MainLayout from "./templates/MainLayout.jsx";

function App() {
  return (
    <div className="app">
        <Router>
          <TitleProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/top-anime-series/" element={<AnimeTable />} />
                <Route path="/top-anime-series/:animeId" element={<AnimeDetail />}/>
                <Route path="/search-results/" element={<SearchResult />} />
                <Route path="/top-type/:type" element={<TypeTable />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/profile/:userID" element={<Profile />} />
                <Route path="/characters" element={<CharacterTable />} />
                <Route path="/character/:characterId" element={<CharacterDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </MainLayout>
          </TitleProvider>
        </Router>
      
    </div>
  );
}

export default App;
