import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, ConfigProvider } from "antd";

const { Meta } = Card;

function AnimesCard({ characterId }) {
  const [animes, setAnimes] = useState([]);

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
        {animes.map(anime => (
          <Col key={anime.id} span={8}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={anime.title} src={anime.animePoster} />}
            >
              <Meta title={anime.title} description={anime.type} />
            </Card>
          </Col>
        ))}
      </Row>
    </ConfigProvider>
  );
}

export default AnimesCard;
