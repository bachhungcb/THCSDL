import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import AnimeDetail from "../anime-detail/AnimeDetail";
import "./AnimeTable.css";
import { Button } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

function AnimeTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // use to check if data is loading
  const [currentPage, setCurrentPage] = useState(1);
  const [animesPerPage] = useState(50);
  const urlWithProxy = "http://localhost:8080/animes";

  useEffect(() => {
    getDataFromServer();
  }, [currentPage]); // Update data when currentPage changes// run only once when the component mounts

  function getDataFromServer() {
    axios
      .get(`${urlWithProxy}?page=${currentPage}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false); // load data successfully, update isLoading to false
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); //if there is an error, update isLoading to false
      });
  }
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    setCurrentPage(currentPage - 1);
  }
  // display data in a table
  return (
    <div className="App">
      <div className="main-nav"></div>
      {!isLoading && (
        <div className="top-anime-table-container">
          <h2 className="top-header">Top Anime Series</h2>
          <table>
            <thead className="tablehead">
              <tr>
                <th className="head-poster">Poster</th>
                <th className="head-title">Title</th>
                <th className="head-genre">Genre</th>
                <th className="head-status">Status</th>
                <th className="head-episodes">Episodes</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {data.map((anime) => (
                <tr key={anime.anime_id}>
                  <td className="body-poster">
                    {anime.animePoster && (
                      <img
                        className="body-poster-img"
                        src={anime.animePoster}
                        alt={anime.title}
                      />
                    )}
                    <div className="hover-info">
                      <h3>{anime.title}</h3>
                      <p>Genres: {anime.genres}</p>
                      <p>Age requirement: {anime.age_requirement}</p>
                      <p>Type: {anime.anime_type}</p>
                      <p>Episodes: {anime.episodes}</p>
                      <p>Status: {anime.stat}</p>
                    </div>
                  </td>
                  <td className="body-title"><Link to={`/anime-detail/${anime.anime_id}`}>{anime.title}</Link></td>
                  <td className="body-genres">{anime.genres}</td>
                  <td className="body-status">{anime.stat}</td>
                  <td className="body-episodes">
                    {anime.episodes}
                    <br></br>({anime.anime_type})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Button to next or previous page, anh em xem để tìm hiểu cách dùng ant design luôn */}
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
      )}
    </div>
  );
}

export default AnimeTable;
