import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../nav-bar/NavBar.jsx";

function Home() {
  return (
    <div className="App">
      <div className="navbar-container">
        <NavBar />
      </div>
      <Link to="/top-anime-series">
        <button>Top Animes Series</button>
      </Link>
    </div>
  );
}

export default Home;
