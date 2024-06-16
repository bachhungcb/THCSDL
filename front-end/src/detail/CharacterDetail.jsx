import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../templates/MainLayout.jsx";
import AnimeCard from "./AnimeCard.jsx";
import CommentBoxCharacter from "../comment-box/CommentBoxCharacter.jsx";
import { Layout, Card, ConfigProvider, Typography } from "antd";

import "./CharacterDetail.css";

const { Content, Sider } = Layout;
const { Title } = Typography;

function CharacterDetail() {
  const { characterId } = useParams();
  const [characterDetail, setCharacterDetail] = useState([]);
  const [roleDetail, setRoleDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const characterResponse = await axios.get(
          `http://localhost:8080/characters/${characterId}`
        );
        setCharacterDetail(characterResponse.data);
        const roleResponse = await axios.get(
          `http://localhost:8080/characters/role/${characterId}`
        );
        setRoleDetail(roleResponse.data);
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
            <Card>
              <div className="charID">
                  <span className="rank">ID: #{character.Id}</span>
              </div>
            </Card>
            <Card >
            <h1>Roles</h1>
            <ul>
                  {roleDetail.map((role) => (
                    <li key={role.anime_id} className="anime-producers">
                      {role.title +" :"}<br />
                      {role.Roles}
                    </li>
                  ))}
                </ul>
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
              <Card>
              <div className="description">
                <h1 className="detail1">Description</h1>
                <p>{character.Description}</p>
              </div>
            </Card>
            <Card>
              <h1 className="detail1">Animeography</h1>
              <div className="Animeography">
                <AnimeCard characterId={characterId} />
              </div>
            </Card>
            
              <Card title="User comments">
                <div className="comment-box">
                  <CommentBoxCharacter characterId={characterId} />
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
