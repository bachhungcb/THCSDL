import React from "react";
import MainLayout from "../templates/MainLayout.jsx";
import TOPANIMELIST from "../assets/TOPANIMELIST.png";
import RandomAnimeByGenres from "./RandomAnimeByGenres.jsx";
function Home() {
  return (

    <div className="App">
      <MainLayout>
        <div className="home">
          <img src={TOPANIMELIST} alt="Top Anime List" />
        </div>
        <br/>
        <RandomAnimeByGenres />
      </MainLayout>
    </div>
  );
}

export default Home;
