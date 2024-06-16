import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, Avatar } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import "./SearchResult.css";

function CharacterResults({ userChoice, searchValue }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      axios
        .get(`http://localhost:8080/animes/${userChoice}/${searchValue}`)
        .then((res) => {
          setSearchData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchValue, userChoice]);

  return (
    <MainLayout breadcrumbs={["Home", "Search Results"]}>
      <List
        header={
          <div className="searchheader" orientation="left">
            Search Results for "{searchValue}"
          </div>
        }
        dataSource={searchData}
        renderItem={(item) => (
          <List.Item key={item.Id}>
            <List.Item.Meta
              avatar={<Avatar src={item.Profile} />}
              title={<Link to={`/character/${item.Id}`}>{item.Name}</Link>}
              description={item.Roles}
            />
          </List.Item>
        )}
      />
    </MainLayout>
  );
}

export default CharacterResults;
