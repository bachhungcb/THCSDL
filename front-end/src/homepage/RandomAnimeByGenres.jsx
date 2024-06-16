import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Carousel } from "antd";
import { useTitle } from "../templates/TitleContext";
import loadingGif from "../assets/loading-screen.gif"; // Đảm bảo đường dẫn đúng
import "./Home.css"; // Đảm bảo đường dẫn đúng

const { Meta } = Card;

function RandomAnimeByGenres() {
  const { setTitle } = useTitle();
  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = () => {
    setIsLoading(true);
    axios.get("http://localhost:8080/random/animes")
      .then((res) => {
        setAnimes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
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
            autoplaySpeed={2500} // Tăng thời gian autoplay lên 3 giây
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
                  cover={<img alt={anime.title} src={anime.animePoster} className="carousel-img" />}
                >
                  <Meta 
                    title={
                      <Link
                        to={`/top-anime-series/${anime.anime_id}`}
                        onClick={() => setTitle(anime.title)}
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
