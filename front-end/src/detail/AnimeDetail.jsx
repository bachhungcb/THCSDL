import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../templates/MainLayout.jsx";
import CharactersCard from "./CharactersCard.jsx";
import { Layout, Card, ConfigProvider } from "antd";
import "./AnimeDetail.css";

const { Header, Content, Footer, Sider } = Layout;

function AnimeDetail() {
  const { animeId } = useParams();
  const [animeDetail, setAnimeDetail] = useState([]);
  const [producers, setProducers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const detailResponse = await axios.get(
          `http://localhost:8080/animes/${animeId}`
        );

        const producerResponse = await axios.get(
          `http://localhost:8080/animes/producers/${animeId}`
        );
        const genresResponse = await axios.get(
          `http://localhost:8080/animes/genres_names/${animeId}`
        );

        setAnimeDetail(detailResponse.data);
        setProducers(producerResponse.data);
        setGenres(genresResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [animeId]);

  return (
    <MainLayout breadcrumbs={[`Home`, `Top Anime Series`]}>
      {animeDetail.map((anime) => (
        <Layout key={anime.anime_id}>
          <Sider className="left-side">
            <div className="container">
              <img
                className="anime-poster"
                src={anime.animePoster}
                alt={anime.title}
              />
            </div>
            <Card>
              <div className="statics">
                <h1>Statics</h1>
                <div>
                  <span className="rank">Rank: #{anime.ranks}</span>
                </div>
                <div>
                  <span className="dark">Scores: </span> {anime.scores}
                </div>
                <div>
                  <span className="dark">Popularity: </span> #{anime.popularity}
                </div>
                <div>
                  <span className="dark">Favourite: </span> {anime.favourite}
                </div>
              </div>
            </Card>
            <Card>
              <div className="producers">
                <h1>Producers</h1>
                <ul>
                  {producers.map((producer) => (
                    <li key={producer.Id} className="anime-producers">{producer.producers}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Sider>
          <Content className="content">
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    headerFontSize: "1.5rem",
                  },
                },
              }}
            >
              <Card title={anime.title}>
                <div className="infomations">
                  <h3 className="detail1">Anime Detail</h3>
                  <div className="detail">
                    <span className="dark">Type: </span>
                    {anime.anime_type}
                  </div>
                  <div className="detail">
                    <span className="dark">Episode: </span>
                    {anime.episodes}
                  </div>
                  <div className="detail">
                    <span className="dark">Status: </span>
                    {anime.stat}
                  </div>
                  <div className="detail">
                    <span className="dark">Aired: </span>
                    {anime.aired_from} to {anime.aired_to === "('Unknown')" ? "N/A" : anime.aired_to}
                  </div>
                  <div className="detail">
                    <span className="dark">Premiered: </span>
                    {anime.premiered || "N/A"}
                  </div>
                  <div className="detail">
                    <span className="dark">Genres: </span>
                    {genres.map((genre, index) => (
                      <span key={genre.genres_id}>
                        {genre.genres}
                        {index !== genres.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="synopsis">
                    <h3 className="detail2">Synopsis</h3>
                    <div>
                      <span>{anime.synopsis}</span>
                    </div>
                  </div>
                </div>
              </Card>
              <CharactersCard animeId={animeId} />
            </ConfigProvider>
          </Content>
        </Layout>
      ))}
    </MainLayout>
  );
}

export default AnimeDetail;
