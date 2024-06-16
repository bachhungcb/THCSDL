import React from "react";
import MainLayout from "../templates/MainLayout.jsx";
import RandomAnimeByGenres from "./RandomAnimeByGenres.jsx";
function Home() {
  return (

    <div className="App">
      <MainLayout>
        <RandomAnimeByGenres />
      </MainLayout>
    </div>
  );
}

export default Home;
