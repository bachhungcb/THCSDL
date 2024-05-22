import React, { useState, useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import axios from "axios";
import MainLayout from "../templates/MainLayout.jsx";
import { Layout, Card, ConfigProvider } from "antd";
import "./AnimeDetail.css";

const { Header, Content, Footer, Sider } = Layout;

function AnimeDetail() {
  const { animeId } = useParams();
  const [animeDetail, setAnimeDetail] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [producers, setProducers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const detailResponse = await axios.get(
          `http://localhost:8080/animes/${animeId}`
        );
        const characterResponse = await axios.get(
          `http://localhost:8080/animes/characters/${animeId}`
        );
        const producerResponse = await axios.get(
          `http://localhost:8080/animes/producers/${animeId}`
        );

        setAnimeDetail(detailResponse.data);
        setCharacters(characterResponse.data);
        setProducers(producerResponse.data);
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
                    {anime.aired_from} to {anime.aired_to}
                  </div>
                  <div className="detail">
                    <span className="dark">Producers: </span>
                    {anime.producers_name}
                  </div>
                  <div className="detail">
                    <span className="dark">Genres: </span>
                    {anime.genres}
                  </div>
                  <div className="synopsis">
                    <h3 className="detail2">Synopsis</h3>
                    <p>{anime.synopsis}</p>
                  </div>
                </div>
              </Card>
            </ConfigProvider>
          </Content>
        </Layout>
      ))}
    </MainLayout>
  );
}

export default AnimeDetail;
