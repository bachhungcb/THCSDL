import React from "react";
import TOPANIMELIST from "../../assets/TOPANIMELIST.png";
import RandomAnimeByGenres from "./RandomAnimeByGenres.jsx";
function Home() {
  return (
    <div className="App">
        <div className="home">
          <img src={TOPANIMELIST} alt="Top Anime List" />
        </div>
        <br/>
        <RandomAnimeByGenres />
    </div>
  );
}

export default Home;
