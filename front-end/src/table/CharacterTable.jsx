import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Popover, Typography } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import MainLayout from "../templates/MainLayout";
import loadingGif from "../assets/loading-screen.gif";
import { useTitle } from "../templates/TitleContext";
import FavouriteButton from "../button/AddFavouriteCharacterButton";
import "./AnimeTable.css";

const { Text } = Typography;

function CharacterTable() {
  const { setTitle } = useTitle();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const charsPerPage = 50;
  const urlWithProxy = "http://localhost:8080/characters";

  useEffect(() => {
    getDataFromServer();
  }, [currentPage]);

  const getDataFromServer = () => {
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
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const columns = [
    {
      title: "Number",
      key: "number",
      render: (text, record, index) => (
        <span style={{ fontSize: "46px", fontWeight: 800, color: "#888" }}>{(currentPage - 1) * charsPerPage + index + 1}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      width: "60%",

      render: (text, record) => (
        <div className="body-title">
          <div className="body-poster">
            <Popover
              content={
                <img
                  src={record.Profile}
                  alt={record.Name}
                  style={{width: 150}}
                />
              }
            >
              <img
                src={record.Profile}
                alt={record.Name}
                className="body-poster-img"
              />
            </Popover>
          </div>
          <div className="char-body-title-text">
          <h3 className="anime-name">
            <Link
              to={`/character/${record.Id}`}
              onClick={() => setTitle(record.Name)}
            >
              {record.Name}
            </Link>
          </h3>
          <div className="atf">
              <FavouriteButton characterId={record.Id} />
            </div>
          </div>
          
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="top-char-table-container">
        <h2 className="top-header">Character List</h2>

        {isLoading ? (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        ) : (
          <>
            <Table
              dataSource={data}
              columns={columns}
              rowKey="Id"
              pagination={false}
              className="character-table"
              size="small"
            />
            <div className="pagination-buttons">
              {currentPage > 1 && (
                <Button type="primary" onClick={handlePrevPage}>
                  <CaretLeftOutlined /> Previous
                </Button>
              )}
              {data.length === charsPerPage && (
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

export default CharacterTable;
