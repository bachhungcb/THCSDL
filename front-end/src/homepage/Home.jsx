import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../nav-bar/NavBar.jsx";
import MainLayout from "../templates/MainLayout.jsx";
function Home() {
  return (

    <div className="App">
      <MainLayout>
      <Link to="/top-anime-series">
        <button>Top Animes Series</button>
      </Link>
      </MainLayout>
    </div>
  );
}

export default Home;
