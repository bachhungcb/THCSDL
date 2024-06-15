import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Popover, Typography } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import MainLayout from "../templates/MainLayout";
import { useTitle } from "../templates/TitleContext";
import loadingGif from "../assets/loading-screen.gif";
import FavouriteButton from "../button/AddFavouriteButton";
import "./AnimeTable.css";

const { Text } = Typography;

function AnimeTable() {
  const { setTitle } = useTitle();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [animesPerPage] = useState(50);
  const urlWithProxy = "http://localhost:8080/animes";
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    setUserRole(role);
    getDataFromServer();
  }, [currentPage]);

  function getDataFromServer() {
    setIsLoading(true); 
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
      title: "Rank",
      dataIndex: "ranks",
      key: "ranks",
      width: "10%",
      render: (text) => (
        <span style={{ fontSize: "46px", fontWeight: 800, color: "#888" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "70%",
      render: (text, record) => {
        const content = (
          <div className="hover-info">
            <h3>{record.title}</h3>
            <div>
              <span className="dark">Age requirement: </span>{" "}
              {record.age_requirement}
            </div>
            <div>
              <span className="dark">Type: </span> {record.anime_type}
            </div>
            <div>
              <span className="dark">Episodes: </span> {record.episodes}
            </div>
            <div>
              <span className="dark">Status: </span> {record.stat}
            </div>
            <div>
              <span className="dark">Popularity: </span> #{record.popularity}
            </div>
            <div>
              <span className="dark">Favourite: </span> {record.favourite}
            </div>
          </div>
        );
        return (
          <div className="body-title">
            <div className="body-poster">
              {record.animePoster && (
                <Popover content={content}>
                  <img
                    src={record.animePoster}
                    alt={record.title}
                    className="body-poster-img"
                  />
                </Popover>
              )}
            </div>
            <div className="body-title-text">
              <div>
                <span className="anime-name">
                  <Link
                    to={`/top-anime-series/${record.anime_id}`}
                    onClick={() => setTitle(record.title)}
                  >
                    {text}
                  </Link>
                </span>
              </div>
              <div>
                <span className="dark">Aired: </span>
                {record.aired_from} to {record.aired_to || "N/A"}
              </div>
              <div>
                <span className="dark">Premiered: </span>
                {record.premiered || "N/A"}
              </div>
            </div>
            <div className="atf">
              <FavouriteButton animeId={record.anime_id} />
            </div>
          </div>
        );
      },
    },
    {
      title: "Score",
      dataIndex: "scores",
      key: "scores",
      width: "10%",
    },
    {
      title: "Episodes",
      dataIndex: "episodes",
      key: "episodes",
      width: "10%",
      render: (text, record) => (
        <>
          {text}
          <br />({record.anime_type})
        </>
      ),
    },
  ];

  if (userRole === `"banned"`) {
    return (
      <MainLayout breadcrumbs={["Home"]}>
        <div className="banned-message">
          <Typography.Title level={2}>Access Denied</Typography.Title>
          <Typography.Paragraph>
            Your account has been banned. You do not have access to view this
            content.
          </Typography.Paragraph>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout breadcrumbs={["Home"]}>
      <div className="top-anime-table-container">
        <h2 className="top-header">Top Anime Series</h2>

        {isLoading ? (
          <div className="loading-container">
            <img
              src={loadingGif}
              alt="Loading..."
              className="loading-gif"
            />
          </div>
        ) : (
          <>
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
              {data.length === animesPerPage && (
                <Button type="primary" onClick={handleNextPage}>
                  Next <CaretRightOutlined />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default AnimeTable;
