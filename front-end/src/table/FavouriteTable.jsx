import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Popover } from "antd";
import { useTitle } from "../templates/TitleContext";
import loadingGif from "../assets/loading-screen.gif";
import RemoveFavouriteButton from "../button/RemoveFavouriteButton";
import nah from "../assets/nah.png";
import "./AnimeTable.css";

function FavouriteTable({ userID }) {
  const { setTitle } = useTitle();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlWithProxy = "http://localhost:8080/favourite/";

  useEffect(() => {
    getDataFromServer();
  }, [userID]);

  const getDataFromServer = () => {
    setIsLoading(true); // Set loading to true before fetching data
    axios
      .get(`${urlWithProxy}${userID}`)
      .then((res) => {
        // Kiểm tra dữ liệu nhận được
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Expected an array but got", res.data);
          setData([]); // Sử dụng mảng rỗng nếu dữ liệu không phải là mảng
        }
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set loading to false even if there is an error
        setData([]); // Sử dụng mảng rỗng khi có lỗi
      });
  };

  const columns = [
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
                {record.aired_from}
                <br /> to {record.aired_to || "N/A"}
              </div>
              <div>
                <span className="dark">Premiered: </span>
                {record.premiered || "N/A"}
              </div>
            </div>
            <div className="atf">
              <RemoveFavouriteButton
                animeId={record.anime_id}
                userId={userID}
                setData={setData}
              />
            </div>
          </div>
        );
      },
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

  return (
    <div className="top-anime-table-container">
      {isLoading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="empty-message">
              <h2>But you haven't added anything in your list !!!</h2>
              <img src={nah} alt="Nah" className="nah" sizes="75%" />
            </div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              rowKey="anime_id"
              pagination={true}
              className="anime-table"
              size="small"
            />
          )}
        </>
      )}
    </div>
  );
}

export default FavouriteTable;
