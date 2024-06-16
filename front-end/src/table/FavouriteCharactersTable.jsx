import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Popover } from "antd";
import { useTitle } from "../templates/TitleContext";
import loadingGif from "../assets/loading-screen.gif";
import RemoveFavouriteButton from "../button/RemoveFavouriteCharacterButton";
import nah from "../assets/nah.png";
import "./AnimeTable.css";

function FavouriteCharacterTable({ userID }) {
  const { setTitle } = useTitle();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlWithProxy = "http://localhost:8080/favourite/characters/";

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
            <RemoveFavouriteButton
                characterId={record.Id}
                userId={userID}
                setData={setData}
              />
              </div>
            </div>
            
          </div>
        ),
      },
  ];

  return (
    <div className="fav-anime-table-container">
      {isLoading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="empty-message">
              <h2>But you haven't added anything in your list !!!</h2>
              <img src={nah} alt="Nah" className="nah" />
            </div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              rowKey="anime_id"
              pagination={true}
              className="fav-table"
              size="small"
            />
          )}
        </>
      )}
    </div>
  );
}

export default FavouriteCharacterTable;
