import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, Divider } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import "./SearchResult.css";
import MainLayout from "../templates/MainLayout.jsx";

function ProducerResults({ userChoice, searchValue }) {
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
          <List.Item key={item.producers_id}>
            <Link to={`/producer/${item.producers_id}`}>
              {item.producers_name}
            </Link>
          </List.Item>
        )}
      />
    </MainLayout>
  );
}

export default ProducerResults;
