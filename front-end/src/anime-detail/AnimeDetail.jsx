import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../nav-bar/NavBar";
import "./AnimeDetail.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function AnimeDetail() {
  const { animeId } = useParams();
  const [animeDetail, setAnimeDetail] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [producers, setProducers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const detailResponse = await axios.get(
          `http://localhost:8080/animes/${animeId}`
        );
        // const characterResponse = await axios.get(
        //   `http://localhost:8080/animes/characters/${animeId}`
        // );
        const producerResponse = await axios.get(
          `http://localhost:8080/animes/producers/${animeId}`
        );

        setAnimeDetail(detailResponse.data);
        // setCharacters(characterResponse.data);
        setProducers(producerResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [animeId]);

  return (
    <div>
      {animeDetail.map((anime) => (
        <Layout>
          <Header className="header">
            <NavBar />
            <br></br>
          </Header>
          <Content className="content">
            <Breadcrumb className="breadcrumb" separator=">">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Top Anime Series</Breadcrumb.Item>
              <Breadcrumb.Item>{anime.title}</Breadcrumb.Item>
            </Breadcrumb>
            <br></br>
          </Content>
          <Layout>
            <Sider background-color="#f5f5f5">
              <div className="container" key = {anime.title}>
                <img
                  className="anime-poster"
                  src={anime.animePoster}
                  alt={anime.title}
                />
              </div>
              <div className="Statics">
                <h1>Statics</h1>
                <div>
                    <span className="Rank">Rank: #{anime.ranks}</span>
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
            <Content>
              <div className="Infomations">
                <h1 className="Detail1">Anime Detail</h1>
                <div className="Detail">
                  <span className="dark">Type: </span>
                   {anime.anime_type}
                </div>
                <div className="Detail">
                  <span className="dark">Episode: </span>
                   {anime.episodes}
                </div>
                <div className="Detail">
                  <span className="dark">Status: </span>
                   {anime.stat}
                </div>
                <div className="Detail">
                  <span className="dark">Aired: </span>
                   {anime.aired_from} to {anime.aired_to}
                </div>
                <div className="Detail">
                  <span className="dark">Producers: </span>
                   {anime.producers_name}
                </div>
                {/* <div className="Detail">
                  <span className="dark">Studio:</span>
                  "{anime.anime_type}"
                </div> */}
                <div className="Detail">
                  <span className="dark">Genres: </span>
                   {anime.genres}
                </div>
                <div className="synopsis">
                  <h1 className="Detail2">Synopsis</h1>
                <p>{anime.synopsis}</p>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      ))}
    </div>
  );
}

export default AnimeDetail;
