import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Carousel } from "antd";
import { useTitle } from "../../templates/TitleContext";
import loadingGif from "../../assets/loading-screen.gif";
import "./Home.css";
import { getRandomAnimes } from "../../services/Api";

const { Meta } = Card;

function RandomAnimeByGenres() {
  const { setTitle } = useTitle();
  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
      getRandomAnimes()
      .then((res) => {
        setAnimes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleAnimeLinkClick = (animeId, title) => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) {
      // Prevent navigation if user is not logged in
      alert("You must be logged in to access this page.");
      return;
    }
    setTitle(title); // Set the title using context
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <div>
          <h1>Anime you should watch today</h1>
          <Carousel 
            autoplay
            autoplaySpeed={3000} // Increased autoplay speed to 3 seconds
            slidesToShow={4}
            slidesToScroll={1}
            dots={false}
            infinite
            arrows
          >
            {animes.map((anime) => (
              <div key={anime.anime_id} style={{ padding: '0 10px' }}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img alt={anime.title} src={anime.animePoster} className="anime-poster" />}
                >
                  <Meta 
                    title={
                      <Link
                        to={`/top-anime-series/${anime.anime_id}`}
                        onClick={() => handleAnimeLinkClick(anime.anime_id, anime.title)}
                      >
                        {anime.title}
                      </Link>
                    }
                    description={anime.animeType}
                  />
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default RandomAnimeByGenres;
