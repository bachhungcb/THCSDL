import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Row, Col, ConfigProvider } from "antd";
import { useTitle } from "../templates/TitleContext";
const { Meta } = Card;

function AnimesCard({ characterId }) {
  const [animes, setAnimes] = useState([]);
  const { setTitle } = useTitle();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/characters/anime/${characterId}`)
      .then((res) => {
        setAnimes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [characterId]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSize: 50,
          },
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {animes.map((anime) => (
          <Col key={anime.anime_id} span={8}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={anime.title} src={anime.animePoster} />}
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
                description={anime.type}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </ConfigProvider>
  );
}

export default AnimesCard;
