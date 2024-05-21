import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Popover } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import MainLayout from "../templates/MainLayout";
import {useTitle} from "../templates/TitleContext";
import "./AnimeTable.css";

function AnimeTable() {
  const { setTitle } = useTitle();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [animesPerPage] = useState(50);
  const urlWithProxy = "http://localhost:8080/animes";

  useEffect(() => {
    getDataFromServer();
  }, [currentPage]);

  function getDataFromServer() {
    axios
      .get(`${urlWithProxy}?page=${currentPage}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    setCurrentPage(currentPage - 1);
  }

  const columns = [
    {
      title: "Poster",
      dataIndex: "animePoster",
      key: "poster",
      render: (text, record) => {
        const content = (
          <div className="hover-info">
            <h3>{record.title}</h3>
            <p>Genres: {record.genres}</p>
            <p>Age requirement: {record.age_requirement}</p>
            <p>Type: {record.anime_type}</p>
            <p>Episodes: {record.episodes}</p>
            <p>Status: {record.stat}</p>
          </div>
        );

        return (
          <div className="poster-container">
            {record.animePoster && (
              <Popover content={content} title={record.title}>
                <img
                  src={record.animePoster}
                  alt={record.title}
                  className="body-poster-img"
                />
              </Popover>
            )}
          </div>
        );
      },
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
      title: "Score",
      dataIndex: "scores",
      key: "score",
      render: (record) => <>{record.scores}</>,
    },
    {
      title: "Episodes",
      dataIndex: "episodes",
      key: "episodes",
      render: (text, record) => (
        <>
          {text}
          <br />({record.anime_type})
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="top-anime-table-container">
        <h2 className="top-header">Top Anime Series</h2>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="anime_id"
          pagination={false}
          className="anime-table"
          size="small"
        />
        <div className="pagination-buttons">
          {currentPage > 1 && (
            <Button type="primary" onClick={handlePrevPage}>
              <CaretLeftOutlined /> Previous
            </Button>
          )}
          {!isLoading && data.length === animesPerPage && (
            <Button type="primary" onClick={handleNextPage}>
              Next <CaretRightOutlined />
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AnimeTable;
