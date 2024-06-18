import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table, Avatar } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import "./SearchResult.css";
import { useTitle } from "../templates/TitleContext.jsx";

function AnimeResults({ userChoice, searchValue }) {
  const location = useLocation();
  const [searchData, setSearchData] = useState([]);
  const { setTitle } = useTitle();
  useEffect(() => {
    if (searchValue) {
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

  const columns = [
    {
      title: "Poster",
      dataIndex: "animePoster",
      key: "animePoster",
      render: (text) => <Avatar src={text} shape="square" size="large" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/top-anime-series/${record.anime_id}`}
          onClick={() => setTitle(record.title)}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Synopsis",
      dataIndex: "synopsis",
      key: "synopsis",
    },
  ];

  return (
    <MainLayout breadcrumbs={["Home", "Search Results"]}>
      <div className="searchheader" orientation="left">
        Search Results for "{searchValue}"
      </div>
      <Table
        columns={columns}
        dataSource={searchData}
        rowKey="anime_id"
        pagination={false}
      />
    </MainLayout>
  );
}

export default AnimeResults;
