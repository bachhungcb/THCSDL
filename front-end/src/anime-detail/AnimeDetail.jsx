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
            <Sider>
              <div className="container" key = {anime.title}>
                <img
                  className="anime-poster"
                  src={anime.animePoster}
                  alt={anime.title}
                />
              </div>
            </Sider>
          </Layout>
        </Layout>
      ))}
    </div>
  );
}

export default AnimeDetail;
