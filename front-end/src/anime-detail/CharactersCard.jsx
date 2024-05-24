import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, List, Avatar } from "antd";

function CharactersCard({ animeId }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/animes/characters/${animeId}`)
      .then((res) => {
        setCharacters(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [animeId]);
  const splitData = (data) => {
    const mid = Math.ceil(data.length / 2);
    return [data.slice(0, mid), data.slice(mid)];
  };

  const [leftColumn, rightColumn] = splitData(characters);
  return (
    <Card title="Characters" >
      <Row>
        <Col span={12}>
          <List
            dataSource={leftColumn}
            renderItem={(item) => (
              <List.Item key={item.Id}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" src={item.Profile} />}
                  title={<Link to={`/character/${item.Id}`}>{item.Name}</Link>}
                  description={item.Roles}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            dataSource={rightColumn}
            renderItem={(item) => (
              <List.Item key={item.Id}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" src={item.Profile} />}
                  title={<Link to={`/character/${item.Id}`}>{item.Name}</Link>}
                  description={item.Roles}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default CharactersCard;
