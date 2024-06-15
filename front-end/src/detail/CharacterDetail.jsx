import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../templates/MainLayout.jsx";
import AnimeCard from "./AnimeCard.jsx";
import CommentBox from "../comment-box/CommentBox.jsx";
import { Layout, Card, ConfigProvider, Typography } from "antd";

import "./CharacterDetail.css";

const { Content, Sider } = Layout;
const { Title } = Typography;

function CharacterDetail() {
  const { characterId } = useParams();
  const [characterDetail, setCharacterDetail] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const characterResponse = await axios.get(
          `http://localhost:8080/characters/${characterId}`
        );

        const animeResponse = await axios.get(
          `http://localhost:8080/characters/anime/${characterId}`
        );

        setCharacterDetail(characterResponse.data);
        setAnimes(animeResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    const role = sessionStorage.getItem("userRole");
    setUserRole(role);
  }, [characterId]);

  if (userRole === `"banned"`) {
    return (
      <MainLayout breadcrumbs={["Home", "Characters"]}>
        <div className="banned-message">
          <Title level={2}>Access Denied</Title>
          <p>Your account has been banned. You do not have access to view this content.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout breadcrumbs={["Home", "Characters"]}>
      {characterDetail.map((character) => (
        <Layout key={character.Id}>
          <Sider className="left-side">
            <div className="container">
              <img
                className="character-profile"
                src={character.Profile}
                alt={character.Name}
              />
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
              <Card title={character.Name}>
                <div className="infomations">
                  <h3 className="detail1">Character Detail</h3>
                  <div className="detail">
                    <span className="dark">ID: </span>
                    {character.Id}
                  </div>
                </div>
              </Card>
              <Card>
              <div className="description">
                <h1>Description</h1>
                <p>{character.Description}</p>
              </div>
            </Card>
              <AnimeCard characterId={characterId} />
              <Card title="User comments">
                <div className="comment-box">
                  <CommentBox characterId={characterId} />
                </div>
              </Card>
            </ConfigProvider>
          </Content>
        </Layout>
      ))}
    </MainLayout>
  );
}

export default CharacterDetail;
